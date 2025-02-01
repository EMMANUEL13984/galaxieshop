let cart = [];
let products = [
    { id: 1, name: "Chaussures", price: 50, img: "chaussures.jpg" },
    { id: 2, name: "Montre", price: 100, img: "montre.jpg" },
    { id: 3, name: "Casque Bluetooth", price: 75, img: "casque.jpg" }
];

// Affichage des produits
function displayProducts() {
    let productContainer = document.getElementById("products");
    products.forEach(product => {
        let div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <img src="${product.img}" alt="${product.name}" width="100">
            <h3>${product.name}</h3>
            <p>${product.price} €</p>
            <button onclick="addToCart(${product.id})">Ajouter</button>
        `;
        productContainer.appendChild(div);
    });
}

// Ajouter au panier
function addToCart(id) {
    let product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
}

// Mettre à jour le panier
function updateCart() {
    let cartList = document.getElementById("cart-items");
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(product => {
        let li = document.createElement("li");
        li.textContent = ${product.name} - ${product.price} €;
        cartList.appendChild(li);
        total += product.price;
    });

    document.getElementById("cart-count").textContent = cart.length;
    document.getElementById("cart-total").textContent = total;
}

// Afficher/Masquer le panier
document.getElementById("cart-btn").addEventListener("click", function () {
    let cartDiv = document.getElementById("cart");
    cartDiv.style.display = (cartDiv.style.display === "none" || cartDiv.style.display === "") ? "block" : "none";
});

// Suivi de commande
function trackOrder() {
    let statusText = ["Commande reçue", "Préparation en cours", "En route", "Livré !"];
    let index = 0;
    let trackingStatus = document.getElementById("tracking-status");

    let interval = setInterval(() => {
        if (index < statusText.length) {
            trackingStatus.textContent = statusText[index];
            index++;
        } else {
            clearInterval(interval);
        }
    }, 3000);
}

// Paiement Stripe
let stripe = Stripe("VOTRE_CLE_STRIPE");  // Remplacez par votre clé Stripe

document.getElementById("pay-btn").addEventListener("click", async function () {
    let totalAmount = cart.reduce((sum, product) => sum + product.price, 0) * 100;

    const response = await fetch("https://api.stripe.com/v1/payment_intents", {
        method: "POST",
        headers: {
            "Authorization": "Bearer VOTRE_CLE_STRIPE_SECRET",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: amount=${totalAmount}&currency=eur&payment_method_types[]=card
    });

    const data = await response.json();
    alert("Paiement validé !");
    cart = [];
    updateCart();
    trackOrder();
});

displayProducts();