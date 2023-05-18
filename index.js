import { menuArray } from '/data.js';

const menuEl = document.getElementById("menu")
const orderEl = document.getElementById("order")
const cardDetailsEl = document.getElementById("card-details-wrap")
let itemsOrdered = []

document.addEventListener("click", function(e){
    if(e.target.dataset.additembtn){
        addItem(Number(e.target.dataset.additembtn))
    }
    else if (e.target.dataset.removebtn) {
        removeItem(e.target.dataset.removebtn)
    }
    else if (e.target.id === "btn-order")
    {
      completeOrder()
    }
    else if(e.target.id === "btn-pay"){
        e.preventDefault()
        processPayment()
    }
})

function addItem(itemId){
    const targetMenuItem = menuArray.filter(function(item){
    return item.id === Number(itemId);
   })[0]

    itemsOrdered.push({
    name: targetMenuItem.name,
    price: targetMenuItem.price,
    id: getRandomId(),
   })
   renderMenu()
}

function removeItem(removeBtnId){
    const removeTargetObject = itemsOrdered.filter(function(rmObj){
        return rmObj.id === Number(removeBtnId);
    })[0]
    itemsOrdered.splice(itemsOrdered.indexOf(removeTargetObject), 1)
    renderMenu()

}

function renderMenu() {
    let menu = ``
        for (const item of menuArray){
          menu  += 
                `<div class="object">
                    <div class="object-wrap">
                        <div class="object-logo">${item.emoji}</div>
                        <div class="object-info">
                        <div class="object-info-name">${item.name}</div>
                        <div class="object-info-ingridients">${Array.isArray(item.ingredients) ? item.ingredients.join(", ") : item.ingredients}</div>
                        <div class="object-info-price">$${item.price}</div>     
                        </div>
                        <button class="object-button" data-additembtn = "${item.id}">+</button>
                    </div>
                    <hr>
                </div>`;

                menuEl.innerHTML = menu;
                
                let orderItemsHTML = ``
                let totalPrice = 0;

                itemsOrdered.length > 0 ? orderEl.classList.remove("hide") : orderEl.classList.add("hide");

                for (let item of itemsOrdered) {
                    orderItemsHTML += 
                ` <div class="order-item">
                        <div class="order-item-name">${item.name}</div>
                        <button class="order-item-remove" data-removebtn = "${item.id}">remove</button>
                        <div class="order-item-price">${item.price}</div>
                    </div>`
                    totalPrice += item.price;
                }

                orderEl.innerHTML = `<div class="order-wrap">
                <div class="order-header">
                    <h2>Your order</h2>
                </div>
                ${orderItemsHTML}
                <hr class="hr-bottom">
                <div class="total-price-wrap">
                    <div class="total-price-text">Total price</div>
                    <div class="total-price order-item-price" id="total-price">${totalPrice}</div>
                </div>
                <button class="btn-order" id="btn-order">Complete order</button>
                </div>` 


}}

function completeOrder() {
    cardDetailsEl.classList.toggle("hide")
    menuEl.style.filter ='blur(1px)' 
    orderEl.style.filter = 'blur(1px)'
}

function processPayment() {
    cardDetailsEl.classList.toggle("hide")
    menuEl.style.filter ='none' 
    orderEl.style.filter = 'none'
    itemsOrdered = []
    orderEl.innerHTML = `<div class="final-message" id="final-message">Thanks, ${document.getElementById("client-name").value}! Your order is on its way!</div>`
}

function getRandomId() {
   return Math.floor(Math.random()*1000)
}

renderMenu()
