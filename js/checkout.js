/**
 * @file checkout.js
 * @description Maneja el proceso de checkout: visualización del resumen del
 *              pedido, validación del formulario y simulación de confirmación
 *              de compra. Extrae datos del carrito desde localStorage.
 * @author Mauricio Artavia Monge
 * @version 1.0
 */
document.addEventListener("DOMContentLoaded", () => {
  // Obtener referencias a elementos del DOM
  const checkoutMessage = document.getElementById("checkoutMessage");
  const form = document.querySelector(".checkout-form");
  const summaryItems = document.getElementById("summary-items");
  const summaryTotal = document.getElementById("summary-total");

  // Obtener el carrito desde localStorage o usar uno vacío
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  /**
   * Mostrar mensaje de error si el carrito está vacío
   */
  if (cart.length === 0) {
    checkoutMessage.textContent = "Tu carrito está vacío. Agrega productos antes de pagar.";
    checkoutMessage.className = "message error";
    checkoutMessage.style.display = "block";
    return;
  }

  // Mostrar resumen de productos y calcular total
  let total = 0;
  cart.forEach((item) => {
    const li = document.createElement("li");
    const subtotal = item.price * item.quantity;
    total += subtotal;
    li.innerHTML = `${item.name} x${item.quantity} – &#8353;${subtotal.toLocaleString()}`;
    summaryItems.appendChild(li);
  });

  // Mostrar total final
  summaryTotal.innerHTML = `<strong>Total:</strong> &#8353;${total.toLocaleString()}`;

  /**
   * Maneja la validación del formulario y muestra mensaje de éxito si todo es válido.
   * También limpia el carrito simulado.
   * 
   * @param {Event} e - Evento de envío del formulario
   */
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener datos del formulario
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();
    const payment = document.getElementById("payment").value;

    // Validar campos requeridos
    if (!name || !address || !email || !payment) {
      checkoutMessage.textContent = "Por favor completa todos los campos.";
      checkoutMessage.className = "message error";
      checkoutMessage.style.display = "block";
      return;
    }

    // Mostrar mensaje de éxito y limpiar carrito
    checkoutMessage.textContent = `¡Gracias por tu compra, ${name}! Tu pedido ha sido procesado.`;
    checkoutMessage.className = "message success";
    checkoutMessage.style.display = "block";

    localStorage.removeItem("cart");
  });
});
