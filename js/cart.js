const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const removeModal = document.getElementById('remove-from-cart-modal');
const quantityInput = document.getElementById('remove-quantity-input');
const confirmRemoveBtn = document.getElementById('confirm-remove-btn');
const cancelRemoveBtn = document.getElementById('cancel-remove-btn');

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentRemoveIndex = null;

// Renderizar el carrito con productos y total
function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
    cartTotalElement.innerHTML = "&#8353;0.00";
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

  // Asignar eventos a botones eliminar dinámicamente
  document.querySelectorAll(".btn-remove").forEach(btn => {
    btn.addEventListener("click", () => showRemoveModal(parseInt(btn.dataset.index)));
  });
}

// Mostrar modal para confirmar eliminación
function showRemoveModal(index) {
  currentRemoveIndex = index;
  quantityInput.max = cart[index].quantity;
  quantityInput.value = 1;

  removeModal.classList.remove('hidden');
  removeModal.setAttribute('aria-hidden', 'false');
  quantityInput.focus();
}

// Confirmar eliminación parcial o total
function confirmRemove() {
  let quantityToRemove = parseInt(quantityInput.value);

  const item = cart[currentRemoveIndex];
  //console.log('Cantidad a eliminar:', quantityToRemove);
  //console.log('Cantidad en carrito:', item.quantity);

  if (isNaN(quantityToRemove) || quantityToRemove <= 0) {
    showToast('Debes ingresar una cantidad válida para eliminar.');
    quantityInput.focus();
    return;
  }

  //const item = cart[currentRemoveIndex];

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

// Cerrar modal
function closeRemoveModal() {
  removeModal.classList.add('hidden');
  removeModal.setAttribute('aria-hidden', 'true');
  currentRemoveIndex = null;
}

// Event listeners modal
confirmRemoveBtn.addEventListener('click', confirmRemove);
cancelRemoveBtn.addEventListener('click', closeRemoveModal);

// Inicializar vista carrito
renderCart();
