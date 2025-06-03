// Obtener referencias a los elementos del DOM
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");

// Cargar productos del localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para mostrar los productos en el carrito
function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
    cartTotalElement.textContent = "0.00";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const productDiv = document.createElement("div");
    productDiv.className = "cart-item";
    productDiv.innerHTML = `
      <p><strong>${item.name}</strong></p>
      <p>₡${item.price.toFixed(2)} x ${item.quantity}</p>
      <p>Subtotal: ₡${itemTotal.toFixed(2)}</p>
      <button onclick="removeFromCart(${index})">Eliminar</button>
    `;
    cartItemsContainer.appendChild(productDiv);
  });

  cartTotalElement.textContent = total.toFixed(2);
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Inicializar
renderCart();
