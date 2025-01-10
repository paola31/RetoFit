const cart = [];
const cartItemsContainer = document.querySelector("#cart-items");
const totalPoints = document.querySelector("#total-points");
const clearCartButton = document.querySelector("#clear-cart");

// Función para actualizar el carrito
function updateCart() {
    // Vaciar el contenedor del carrito
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p>Tu carrito está vacío.</p>`;
        totalPoints.textContent = `Total: 0 puntos`;
        return;
    }

    // Crear los elementos del carrito dinámicamente
    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item", "d-flex", "justify-content-between", "align-items-center");

        cartItem.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${item.image}" alt="${item.name}" width="50" height="50" class="me-3">
                <span>${item.name}</span>
            </div>
            <div>
                <span>${item.quantity} x ${item.price} pts</span>
            </div>
            <div class="d-flex align-items-center">
                <button class="btn btn-sm btn-secondary decrement me-1" data-id="${item.id}">-</button>
                <button class="btn btn-sm btn-success increment me-1" data-id="${item.id}">+</button>
                <button class="btn btn-sm btn-danger remove-item" data-id="${item.id}">Eliminar</button>
            </div>
        `;

        // Agregar el item al contenedor del carrito
        cartItemsContainer.appendChild(cartItem);
    });

    // Calcular el total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPoints.textContent = `Total: ${total} puntos`;
}

// Agregar producto al carrito
function addToCart(id, name, price, image) {
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    updateCart();
}

// Vaciar el carrito
function clearCart() {
    cart.length = 0; // Vacía el array del carrito
    updateCart();
}

// Manejar clic en botones del carrito
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
        const id = parseInt(e.target.dataset.id, 10);
        const name = e.target.dataset.name;
        const price = parseInt(e.target.dataset.price, 10);
        const image = e.target.dataset.image;

        addToCart(id, name, price, image);
    }

    if (e.target.classList.contains("remove-item")) {
        const id = parseInt(e.target.dataset.id, 10);
        const itemIndex = cart.findIndex((item) => item.id === id);

        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
        }

        updateCart();
    }

    if (e.target.classList.contains("increment")) {
        const id = parseInt(e.target.dataset.id, 10);
        const item = cart.find((item) => item.id === id);

        if (item) {
            item.quantity += 1;
        }

        updateCart();
    }

    if (e.target.classList.contains("decrement")) {
        const id = parseInt(e.target.dataset.id, 10);
        const item = cart.find((item) => item.id === id);

        if (item && item.quantity > 1) {
            item.quantity -= 1;
        } else if (item && item.quantity === 1) {
            // Eliminar si la cantidad es 1 y se hace clic en disminuir
            const itemIndex = cart.findIndex((item) => item.id === id);
            cart.splice(itemIndex, 1);
        }

        updateCart();
    }
});

// Evento para vaciar el carrito
clearCartButton.addEventListener("click", clearCart);
