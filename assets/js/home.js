"use strict";

let addCartBtns = document.querySelectorAll(".add-cart");
let link = document.querySelector(".sup-part");
let products = [];

if (JSON.parse(localStorage.getItem("products")) != null) {
    products = JSON.parse(localStorage.getItem("products"));
}

// link.addEventListener("click", function(e){
//         e.preventDefault();
// })

addCartBtns.forEach(addCart => {
    getProductsCount(products);
    addCart.addEventListener("click", function (e) {
        e.preventDefault();

        let itemImg = this.parentNode.parentNode.parentNode.firstElementChild.getAttribute("src");
        let itemName = this.parentNode.parentNode.firstElementChild.innerText;
        let itemFeature = this.parentNode.parentNode.children[1].innerText;
        let itemPrice = this.nextElementSibling.innerText;
        let itemID = parseInt(this.parentNode.parentNode.parentNode.getAttribute("data-id"))
        let existProduct = products.find(m => m.id == itemID);

        if (existProduct != undefined) {
            existProduct.count += 1;
        } else {
            products.push({
                id: itemID,
                image: itemImg,
                name: itemName,
                feature: itemFeature,
                price: itemPrice,
                count: 1
            })
        }

        localStorage.setItem("products", JSON.stringify(products));
        getProductsCount(products);
    })
});

function getProductsCount(arr) {
    let cnt = 0;
    for (const eachItem of arr) {
        cnt += eachItem.count;
        document.querySelector("sup").innerText = cnt;
    }
}










