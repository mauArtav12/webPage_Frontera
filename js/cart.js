/**
 * @file cart.js
 * @description Lógica principal de la página del carrito: renderiza productos,
 *              gestiona eliminaciones y sincroniza el contador general.
 * @author Mauricio Artavia Monge
 * @version 1.0
 */

// === Elementos del DOM ===
const cartCountElement = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const cancelRemoveBtn = document.getElementById('cancel-remove-btn');
const confirmRemoveBtn = document.getElementById('confirm-remove-btn');
const removeModal = document.getElementById('remove-from-cart-modal');
const quantityInput = document.getElementById('remove-quantity-input');

// === Variables de estado ===
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentRemoveIndex = null;

/**
 * Renderiza los productos del carrito y calcula el total.
 * También actualiza el contador y asigna eventos a botones de eliminación.
 */
function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
    cartTotalElement.innerHTML = "&#8353;0.00";
    updateCartCount();
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
      <p>&#8353;${item.price.toLocaleString('es-CR', { minimumFractionDigits: 2 })} x ${item.quantity}</p>
      <p>Subtotal: &#8353;${itemTotal.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</p>
      <button type="button" class="btn-remove" data-index="${index}">Eliminar</button>
    `;
    cartItemsContainer.appendChild(productDiv);
  });

  cartTotalElement.innerHTML = `&#8353;${total.toLocaleString('es-CR', { minimumFractionDigits: 2 })}`;
  updateCartCount();

  // Asignar eventos a botones eliminar dinámicamente.
  document.querySelectorAll(".btn-remove").forEach(btn => {
    btn.addEventListener("click", () => showRemoveModal(parseInt(btn.dataset.index)));
  });
}

/**
 * Muestra el modal para confirmar la cantidad a eliminar de un producto del carrito.
 * @param {number} index - Índice del producto en el arreglo del carrito
 */
function showRemoveModal(index) {
  currentRemoveIndex = index;
  quantityInput.max = cart[index].quantity;
  quantityInput.value = 1;

  removeModal.classList.remove('hidden');
  removeModal.setAttribute('aria-hidden', 'false');
  quantityInput.focus();
}

/**
 * Confirma la eliminación parcial o total de un producto del carrito.
 * Valida la cantidad ingresada y actualiza el estado y el DOM.
 */
function confirmRemove() {
  const item = cart[currentRemoveIndex];
  const quantityToRemove = parseInt(quantityInput.value);

  if (isNaN(quantityToRemove) || quantityToRemove <= 0) {
    showToast('Debes ingresar una cantidad válida para eliminar.');
    quantityInput.focus();
    return;
  }

  if (quantityToRemove > item.quantity) {
    showToast(`Solo tienes ${item.quantity} unidades en el carrito.`);
    quantityInput.focus();
    return;
  }

  if (quantityToRemove === item.quantity) {
    cart.splice(currentRemoveIndex, 1);
  } else {
    cart[currentRemoveIndex].quantity -= quantityToRemove;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  closeRemoveModal();
}

/**
 * Cierra el modal de eliminación y limpia el índice actual.
 */
function closeRemoveModal() {
  removeModal.classList.add('hidden');
  removeModal.setAttribute('aria-hidden', 'true');
  currentRemoveIndex = null;
}

// === Asignación de eventos del modal ===
confirmRemoveBtn.addEventListener('click', confirmRemove);
cancelRemoveBtn.addEventListener('click', closeRemoveModal);

// === Inicialización de la vista del carrito ===
renderCart();
