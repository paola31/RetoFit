// Seleccionamos elementos del DOM
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const totalElement = document.getElementById('total');
const emptyCartButton = document.getElementById('empty-cart');

// Estado del carrito
let cart = [];

// Función para actualizar el carrito
function updateCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
    <div class="cart-item-content">
      <div class="cart-item-details">
        <img src="${item.image}" alt="${item.name}">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">$${item.price} x ${item.quantity}</p>
      </div>
      <div class="cart-item-actions">
        <button class="decrement" data-id="${item.id}">-</button>
        <button class="increment" data-id="${item.id}">+</button>
        <button class="remove-item" data-id="${item.id}">Eliminar</button>
      </div>
    </div>
  `;

    cartItemsContainer.appendChild(cartItem);
  });

  totalElement.textContent = total;

  // Agregar eventos a los botones de incrementar, decrementar y eliminar
  const incrementButtons = document.querySelectorAll('.increment');
  const decrementButtons = document.querySelectorAll('.decrement');
  const removeButtons = document.querySelectorAll('.remove-item');

  incrementButtons.forEach((button) =>
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      incrementQuantity(id);
    })
  );

  decrementButtons.forEach((button) =>
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      decrementQuantity(id);
    })
  );

  removeButtons.forEach((button) =>
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      removeFromCart(id);
    })
  );
}

// Función para agregar un producto al carrito
function addToCart(id, name, price, image) {
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1, image });
  }
  updateCart();
}

// Función para incrementar la cantidad
function incrementQuantity(id) {
  const item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity++;
    updateCart();
  }
}

// Función para decrementar la cantidad
function decrementQuantity(id) {
  const item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity--;
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      updateCart();
    }
  }
}

// Función para eliminar un producto del carrito
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}

// Función para vaciar el carrito
function emptyCart() {
  cart = [];
  updateCart();
}

// Eventos para agregar al carrito
addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const product = button.parentElement;
    const id = product.getAttribute('data-id');
    const name = product.getAttribute('data-name');
    const price = parseFloat(product.getAttribute('data-price'));
    const image = product.getAttribute('data-image');

    addToCart(id, name, price, image);
  });
});

// Evento para vaciar el carrito
emptyCartButton.addEventListener('click', emptyCart);
