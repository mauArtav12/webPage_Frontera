document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".checkout-form");
  const summaryItems = document.getElementById("summary-items");
  const summaryTotal = document.getElementById("summary-total");
  const checkoutMessage = document.getElementById("checkoutMessage");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    checkoutMessage.textContent = "Tu carrito está vacío. Agrega productos antes de pagar.";
    checkoutMessage.className = "message error";
    checkoutMessage.style.display = "block";
    return;
  }

  let total = 0;
  cart.forEach((item) => {
    const li = document.createElement("li");
    const subtotal = item.price * item.quantity;
    total += subtotal;
    li.innerHTML = `${item.name} x${item.quantity} – &#8353;${subtotal.toLocaleString()}`;
    summaryItems.appendChild(li);
  });

  summaryTotal.innerHTML = `<strong>Total:</strong> &#8353;${total.toLocaleString()}`;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();
    const payment = document.getElementById("payment").value;

    if (!name || !address || !email || !payment) {
      checkoutMessage.textContent = "Por favor completa todos los campos.";
      checkoutMessage.className = "message error";
      checkoutMessage.style.display = "block";
      return;
    }

    checkoutMessage.textContent = `¡Gracias por tu compra, ${name}! Tu pedido ha sido procesado.`;
    checkoutMessage.className = "message success";
    checkoutMessage.style.display = "block";

    localStorage.removeItem("cart");
  });
});
