// main.js
import { database } from "./firebaseConfig.js";
import { ref, onValue } from "./firebase-database.js";

function fetchAndDisplayProducts() {
    const productRef = ref(database, 'products');
    onValue(productRef, (snapshot) => {
        const data = snapshot.val();
        const products = Object.values(data);
        document.getElementById("product").innerHTML = products.map(product =>
            `<div class="product">
                <h2>${product.name}</h2>
                <img class="image" src="${product.imageSrc}" alt="${product.name}">
                <h3>Description</h3>
                <p class="description">${product.detaille}</p>
            </div>`
        ).join('');
    });
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayProducts);
