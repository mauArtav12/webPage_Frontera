let currentProductId = null;
let currentMinPrice = 0;       // Precio mínimo inicial
let currentMaxPrice = 100000;  // Precio máximo inicial

// Función para obtener categorías únicas de los productos
function getUniqueCategories() {
  const categories = products.map(p => p.category);
  return [...new Set(categories)].sort();
}

// Renderiza los checkboxes de categorías
function renderCategoryCheckboxes() {
  const container = document.getElementById("category-filters");
  if (!container) return;

  container.innerHTML = "";

  const categories = getUniqueCategories();
  categories.forEach(cat => {
    const checkbox = document.createElement("label");
    checkbox.innerHTML = `
      <input type="checkbox" value="${cat}" class="category-checkbox" />
      ${cat}
    `;
    container.appendChild(checkbox);
  });
}

function renderProducts({ onlyFeatured = false, searchTerm = '', categories = [], minPrice = 0, maxPrice = 100000 } = {}) {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = '';

  const lowerSearchTerm = searchTerm.toLowerCase();
  const lowerCategories = categories.map(c => c.toLowerCase());

  const filtered = products.filter(p => {
    if (onlyFeatured && !p.featured) return false;

    const matchesSearch =
      p.name.toLowerCase().includes(lowerSearchTerm) ||
      p.description.toLowerCase().includes(lowerSearchTerm);

    const matchesCategory =
      lowerCategories.length === 0 || lowerCategories.includes(p.category.toLowerCase());

    const matchesPrice = p.price >= minPrice && p.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="no-results">No se encontraron productos que coincidan.</p>`;
    return;
  }

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

  // Actualizar contador al instante
  updateCartCount();

  const totalQuantity = cart[index !== -1 ? index : cart.length - 1].quantity;
  showToast(`"${product.name}" fue agregado al carrito. Ahora hay ${totalQuantity}.`);
}

window.addEventListener('DOMContentLoaded', () => {
  const isIndex = location.pathname.includes("index.html") || location.pathname.endsWith("/");

  let currentSearchTerm = '';
  let selectedCategories = [];

  renderCategoryCheckboxes();

  // Actualizar productos con los filtros actuales
  function updateProducts() {
    renderProducts({
      onlyFeatured: isIndex,
      searchTerm: currentSearchTerm,
      categories: selectedCategories,
      minPrice: currentMinPrice,
      maxPrice: currentMaxPrice
    });
  }

  // Buscar productos
  const searchInput = document.getElementById('product-search');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      currentSearchTerm = e.target.value;
      updateProducts();
    });
  }

  // Cambios en categorías
  const categoryContainer = document.getElementById('category-filters');
  if (categoryContainer) {
    categoryContainer.addEventListener('change', () => {
      const checkboxes = categoryContainer.querySelectorAll('.category-checkbox:checked');
      selectedCategories = Array.from(checkboxes).map(cb => cb.value);
      updateProducts();
    });
  }

  // Filtros de rango de precios: mínimo y máximo
  const priceMinInput = document.getElementById('price-min');
  const priceMaxInput = document.getElementById('price-max');
  const priceMinValue = document.getElementById('price-min-value');
  const priceMaxValue = document.getElementById('price-max-value');

  if (priceMinInput && priceMaxInput && priceMinValue && priceMaxValue) {
    // Inicializar valores visuales
    priceMinValue.textContent = Number(priceMinInput.value).toLocaleString();
    priceMaxValue.textContent = Number(priceMaxInput.value).toLocaleString();

    priceMinInput.addEventListener('input', () => {
      let minVal = Number(priceMinInput.value);
      let maxVal = Number(priceMaxInput.value);

      if (minVal > maxVal) {
        minVal = maxVal;
        priceMinInput.value = minVal;
      }

      currentMinPrice = minVal;
      priceMinValue.textContent = minVal.toLocaleString();

      updateProducts();
    });

    priceMaxInput.addEventListener('input', () => {
      let minVal = Number(priceMinInput.value);
      let maxVal = Number(priceMaxInput.value);

      if (maxVal < minVal) {
        maxVal = minVal;
        priceMaxInput.value = maxVal;
      }

      currentMaxPrice = maxVal;
      priceMaxValue.textContent = maxVal.toLocaleString();

      updateProducts();
    });
  }

  updateProducts();

  // Manejo del modal para agregar al carrito
  document.getElementById('confirm-add-btn')?.addEventListener('click', () => {
    const quantity = parseInt(document.getElementById('quantity-input').value);
    if (isNaN(quantity) || quantity <= 0) {
      showToast('Por favor, ingresa una cantidad válida mayor que cero.');
      return;
    }

    addToCart(currentProductId, quantity);
    document.getElementById('add-to-cart-modal').classList.add('hidden');
  });

  document.getElementById('cancel-add-btn')?.addEventListener('click', () => {
    document.getElementById('add-to-cart-modal').classList.add('hidden');
  });
});
