let currentProductId = null;

function renderProducts({ onlyFeatured = false } = {}) {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = '';

  const filtered = onlyFeatured
    ? products.filter(p => p.featured)
    : products;

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" />
      <h3 class="product-name">${product.name}</h3>
      <p class="product-description">${product.description}</p>
      <p class="product-price">${formatter.format(product.price)}</p>
      <button class="add-to-cart-btn" data-product-id="${product.id}">Agregar al carrito</button>
    `;

    grid.appendChild(card);
  });

  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
      currentProductId = button.dataset.productId;
      document.getElementById('quantity-input').value = 1;
      document.getElementById('add-to-cart-modal').classList.remove('hidden');
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hidden');
  }, 3000);
}

function addToCart(productID, quantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === parseInt(productID));
  if (!product) return;

  const index = cart.findIndex(item => item.id === product.id);

  if (index !== -1) {
    cart[index].quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  const totalQuantity = cart[index !== -1 ? index : cart.length - 1].quantity;
  showToast(`"${product.name}" fue agregado al carrito. Ahora hay ${totalQuantity}.`);
}

window.addEventListener('DOMContentLoaded', () => {
  const isIndex = location.pathname.includes("index.html") || location.pathname.endsWith("/");

  if (isIndex) {
    renderProducts({ onlyFeatured: true }); // Solo productos destacados en index
  } else {
    renderProducts({ onlyFeatured: false }); // Todos los productos en otras páginas
  }

  document.getElementById('confirm-add-btn')?.addEventListener('click', () => {
    const quantity = parseInt(document.getElementById('quantity-input').value);
    if (isNaN(quantity) || quantity <= 0) {
      alert('Cantidad inválida.');
      return;
    }

    addToCart(currentProductId, quantity);
    document.getElementById('add-to-cart-modal').classList.add('hidden');
  });

  document.getElementById('cancel-add-btn')?.addEventListener('click', () => {
    document.getElementById('add-to-cart-modal').classList.add('hidden');
  });
});
