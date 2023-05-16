import { menuArray } from '/data.js';

const menuEl = document.getElementById("menu")


function render() {

        for (const item of menuArray){
  
        menuEl.innerHTML += 
        `<div class="object">
            <div class="object-wrap">
                <div class="object-logo">${item.emoji}</div>
                <div class="object-info">
                <div class="object-info-name">${item.name}</div>
                <div class="object-info-ingridients">${Array.isArray(item.ingredients) ? item.ingredients.join(", ") : item.ingredients}</div>
                <div class="object-info-price">$${item.price}</div>     
                </div>
                <button class="object-button">+</button>
            </div>
            <hr>
        </div>`;
}}

render()


