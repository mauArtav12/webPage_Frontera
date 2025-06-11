/**
 * @file updateCartCount.js
 * @description Actualiza dinámicamente el contador del carrito en la interfaz.
 * @author Mauricio Artavia Monge
 * @version 1.0
 */

/**
 * Actualiza el número total de productos en el carrito y lo muestra
 * en el elemento con id "cart-count" si existe en el DOM.
 * Oculta el contador si el carrito está vacío.
 */
function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  if (!cartCountElement) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartCountElement.textContent = totalQuantity;
  cartCountElement.style.display = totalQuantity > 0 ? 'inline-block' : 'none';
}

// Ejecutar la actualización al cargar el DOM.
document.addEventListener('DOMContentLoaded', updateCartCount);

// Detectar cambios en el localStorage desde otras pestañas y actualizar
// contador.
window.addEventListener('storage', (event) => {
  if (event.key === 'cart') {
    updateCartCount();
  }
});