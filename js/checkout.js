document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".checkout-form");
  const summaryItems = document.getElementById("summary-items");
  const summaryTotal = document.getElementById("summary-total");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Tu carrito está vacío. Agrega productos antes de pagar.");
    window.location.href = "products.html";
    return;
  }

  // Mostrar los productos en el resumen
  let total = 0;
  cart.forEach((item) => {
    const li = document.createElement("li");
    const subtotal = item.price * item.quantity;
    total += subtotal;
    li.textContent = `${item.name} x${item.quantity} – ₡${subtotal.toLocaleString()}`;
    summaryItems.appendChild(li);
  });

  summaryTotal.innerHTML = `<strong>Total:</strong> ₡${total.toLocaleString()}`;

  // Procesar envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();
    const payment = document.getElementById("payment").value;

    if (!name || !address || !email || !payment) {
      alert("Por favor completa todos los campos.");
      return;
    }

    alert(`¡Gracias por tu compra, ${name}! Tu pedido ha sido procesado.`);

    localStorage.removeItem("cart");
    window.location.href = "index.html";
  });
});
