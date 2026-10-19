
const products = [
    { id: 1, name: "Headphones", price: 999, icon: "🎧" },
    { id: 2, name: "Smart Watch", price: 1499, icon: "⌚" },
    { id: 3, name: "Backpack", price: 799, icon: "🎒" },
    { id: 4, name: "Sneakers", price: 1999, icon: "👟" },
    { id: 5, name: "Camera", price: 2499, icon: "📷" },
    { id: 6, name: "Sunglasses", price: 499, icon: "🕶️" }
];

let cart = [];

const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const modal = document.getElementById("checkoutModal");

function displayProducts() {
    productList.replaceChildren();

    products.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";

        const icon = document.createElement("div");
        icon.className = "product-icon";
        icon.textContent = product.icon;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = `₹${product.price}`;

        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.addEventListener("click", () => addToCart(product.id));

        card.append(icon, name, price, button);
        productList.appendChild(card);
    });
}

function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    displayCart();
}

function changeQuantity(productId, amount) {
    const item = cart.find(product => product.id === productId);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== productId);
    }

    displayCart();
}

function displayCart() {
    cartItems.replaceChildren();

    cart.forEach(item => {
        const row = document.createElement("div");
        row.className = "cart-item";

        const details = document.createElement("span");
        details.textContent =
            `${item.name} × ${item.quantity} — ₹${item.price * item.quantity}`;

        const controls = document.createElement("div");

        const minus = document.createElement("button");
        minus.textContent = "−";
        minus.setAttribute("aria-label", `Remove one ${item.name}`);
        minus.addEventListener("click", () => changeQuantity(item.id, -1));

        const plus = document.createElement("button");
        plus.textContent = "+";
        plus.setAttribute("aria-label", `Add one ${item.name}`);
        plus.addEventListener("click", () => changeQuantity(item.id, 1));

        controls.append(minus, plus);
        row.append(details, controls);
        cartItems.appendChild(row);
    });

    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    cartCount.textContent = count;
    cartTotal.textContent = total.toLocaleString("en-IN");

    document.getElementById("checkoutButton").disabled = count === 0;
}

document.getElementById("cartButton").addEventListener("click", () => {
    document.getElementById("cartSection").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("checkoutButton").addEventListener("click", () => {
    if (cart.length === 0) return;

    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("checkoutSummary").textContent =
        `You have ${count} item(s) in your cart. Total: ₹${total.toLocaleString("en-IN")}.`;

    modal.hidden = false;
});

function closeCheckout() {
    modal.hidden = true;
}

document.getElementById("closeModal").addEventListener("click", closeCheckout);

modal.addEventListener("click", event => {
    if (event.target === modal) closeCheckout();
});

document.getElementById("confirmButton").addEventListener("click", () => {
    alert("Demo order confirmed! No payment was processed.");
    cart = [];
    displayCart();
    closeCheckout();
});

displayProducts();
displayCart();
