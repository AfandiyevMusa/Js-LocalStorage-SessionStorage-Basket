"use strict";

let products = JSON.parse(localStorage.getItem("products"));
let tableBody = document.querySelector("tbody");
let input = document.querySelectorAll("input")
let totalPrice = document.querySelector(".total-value");

if (products != null) {
    document.querySelector(".alert-light").classList.add("d-none")
    document.querySelector("table").classList.remove("d-none")
    getProductsCount(products);
    products.forEach(product => {
        tableBody.innerHTML += `<tr data-id="${product.id}">
        <td><img src="${product.image}" alt=""></td>
        <td>${product.name}</td>
        <td>${product.feature}</td>
        <td class = "product-price">${parseFloat(product.price) * parseInt(product.count)} ₼</td>
        <td>
            <div class="count">
                <i class="fa-solid fa-minus minus"></i>
                <input type="number" value="${product.count}" min="1" max="10" disabled>
                <i class="fa-solid fa-plus plus"></i>
            </div>
        </td>
        <td><i class="fa-solid fa-trash delete-all"></i></td>
    </tr>`;
        getProductsCount(products);
    });

    let minusBtns = document.querySelectorAll(".minus")
    let plusBtns = document.querySelectorAll(".plus");

    for (let i = 0; i < minusBtns.length; i++) {
        minusBtns[i].addEventListener("click", function (e) {
            let decreasedProduct = products.find(m => m.id == minusBtns[i].parentElement.parentElement.parentElement.getAttribute("data-id"))
            if (decreasedProduct.count > 1) {
                decreasedProduct.count -= 1;
                minusBtns[i].nextElementSibling.value = decreasedProduct.count;

                let productLastPrice = minusBtns[i].parentElement.parentElement.previousElementSibling.innerText;
                productLastPrice = productLastPrice - decreasedProduct.price;
                // minusBtns[i].parentElement.parentElement.previousElementSibling.innerText = productLastPrice.toString()

                localStorage.setItem("products", JSON.stringify(products))
                document.querySelector("sup").innerText--;
                totalPrice.innerText = `${total(JSON.parse(localStorage.getItem("products")))}` + " AZN";
            } else {
                minusBtns[i].classList.add("unable")
            }
        })
    }

    for (let i = 0; i < plusBtns.length; i++) {
        plusBtns[i].addEventListener("click", function (e) {
            let increasedProduct = products.find(m => m.id == plusBtns[i].parentElement.parentElement.parentElement.getAttribute("data-id"))
            increasedProduct.count += 1;
            plusBtns[i].previousElementSibling.value = increasedProduct.count;
            localStorage.setItem("products", JSON.stringify(products))
            document.querySelector("sup").innerText++;
            totalPrice.innerText = `${total(JSON.parse(localStorage.getItem("products")))}` + " AZN";
        })
    }

    let deleteBtns = document.querySelectorAll(".delete-all")
    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener("click", function (e) {
            e.preventDefault();
            deleteBtns[i].parentElement.parentElement.remove();
            let shouldBeDeleted = products.find(m => m.id == deleteBtns[i].parentElement.parentElement.getAttribute("data-id"))
            let indexDeleted = products.indexOf(shouldBeDeleted)
            if (indexDeleted > -1) {
                products.splice(indexDeleted, 1)
            }
            localStorage.setItem("products", JSON.stringify(products))
            let num = parseInt(document.querySelector("sup").innerText) - parseInt(deleteBtns[i].parentElement.previousElementSibling.firstElementChild.children[1].value);
            document.querySelector("sup").innerText = num
            totalPrice.innerText = `${total(JSON.parse(localStorage.getItem("products")))}` + " AZN";
        })
    }

    function total(str) {
        let sum = 0;
        for (const eachStr of str) {
            sum += (parseFloat(eachStr.price) * parseFloat(eachStr.count))
        }
        return sum;
    }
    totalPrice.innerText = `${total(JSON.parse(localStorage.getItem("products")))}` + " AZN";
} else {
    document.querySelector(".alert-light").classList.remove("d-none")
    document.querySelector("table").classList.add("d-none")
}

function getProductsCount(arr) {
    let cnt = 0;
    for (const eachItem of arr) {
        cnt += eachItem.count;
    }
    document.querySelector("sup").innerText = cnt;
}