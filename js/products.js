// Formatter for costarrican colones.
const formatter = new Intl.NumberFormat("es-CR", {
  style: "currency",
  currency: "CRC",
  minimumFractionDigits: 0,
});

const products = [
  {
    id: 0,
    name: "Shampoo Natural",
    description: "Ideal para todo tipo de cabello. Libre de sulfatos.",
    price: 4500,
    image: "../img/natural_shampoo.jpg",
    category: "Cuidado Personal"
  },
  {
    id: 1,
    name: "Crema Facial Hidratante",
    description: "Hidrata y nutre la piel sin dejar sensacion grasosa.",
    price: 6420,
    image: "../img/facial_cream.jpeg",
    category: "Cuidado Personal"
  },
  {
    id: 2,
    name: "Blusa de Algodon",
    description: "Ropa comoda y fresca para el dia a dia.",
    price: 8900,
    image: "../img/blouse.png",
    category: "Ropa y Accesorios"
  },
  {
    id: 3,
    name: "Suplemento Vitaminico",
    description: "Refuerza tu sistema inmune con vitaminas esenciales.",
    price: 3750,
    image: "../img/vitamin_suplement.jpeg",
    category: "Cuidado Personal"
  },
  {
    id: 4,
    name: "Shampoo Revitalizante",
    description: "Ideal para cabello seco y maltratado.",
    price: 3500,
    image: "../img/revitalant_shampoo.jpg",
    category: "Cuidado Personal"
  },
  {
    id: 5,
    name: "Crema Hidratante",
    description: "Manten tu piel suave todo el dia.",
    price: 2800,
    image: "../img/hidratant_cream.avif",
    category: "Cuidado Personal"
  },
  {
    id: 6,
    name: "Camiseta Estilo Panama",
    description: "Ligera, fresca y con mucho flow.",
    price: 6000,
    image: "../img/panama_shirt.jpg",
    category: "Ropa y Accesorios"
  },
  /* ======================================================================== */
  {
    id: 7,
    name: "Aceite Esencial de Lavanda",
    description: "Relajante natural para aromaterapia o masajes.",
    price: 5200,
    image: "../img/lavender_oil.jpg",
    category: "Cuidado Personal"
  },
  {
    id: 8,
    name: "Jabon Artesanal de Avena",
    description: "Suave con la piel, ideal para piel sensible.",
    price: 2500,
    image: "../img/oat_soap.jpg",
    category: "Cuidado Personal"
  },
  {
    id: 9,
    name: "Pantalon Deportivo Unisex",
    description: "Comodo y versatil para cualquier actividad.",
    price: 9900,
    image: "../img/sport_pants.jpg",
    category: "Ropa y Accesorios"
  },
  {
    id: 10,
    name: "Mochila Ecologica",
    description: "Hecha con materiales reciclados, resistente y liviana.",
    price: 11500,
    image: "../img/backpack.jpg",
    category: "Ropa y Accesorios"
  },
  {
    id: 11,
    name: "Toalla de Microfibra Compacta",
    description: "Absorbe rapido y es facil de guardar.",
    price: 3700,
    image: "../img/towel.webp",
    category: "Bienestar y Hogar"
  },
  {
    id: 12,
    name: "Protector Solar Mineral SPF 50",
    description: "Protege tu piel sin quimicos agresivos.",
    price: 8200,
    image: "../img/sunscreen.jpg",
    category: "Cuidado Personal"
  },
  {
    id: 13,
    name: "Infusor de Te Reutilizable",
    description: "Ideal para preparar tus mezclas de te favoritas.",
    price: 1800,
    image: "../img/tea_infuser.jpg",
    category: "Bienestar y Hogar"
  },
  {
    id: 14,
    name: "Set de Velas Aromaticas Naturales",
    description: "Hechas con cera de soya y aceites esenciales.",
    price: 7600,
    image: "../img/candles.jpg",
    category: "Bienestar y Hogar"
  },
  {
    id: 15,
    name: "Desodorante Natural en Barra",
    description: "Libre de aluminio y fragancias artificiales.",
    price: 4300,
    image: "../img/deodorant.jpg",
    category: "Cuidado Personal"
  },
  {
    id: 16,
    name: "Bolso de Mano de Yute",
    description: "Perfecto para compras o salidas casuales",
    price: 7900,
    image: "../img/jute_bag.avif",
    category: "Ropa y Accesorios"
  },
];

function addToCart(productID, quantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = products.find(p => p.id === parseInt(productID));
  if (!product) return;

  const existingProductIndex = cart.findIndex(item => item.id === product.id);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert(`"${product.name}" fue agregado al carrito. Cantidad total ahora: ${cart[existingProductIndex !== -1 ? existingProductIndex : cart.length -1].quantity}`);
}


let currentProductId = null;

// Ejecutar todo una vez que el DOM esté completamente cargado
window.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById("product-grid");

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image"/>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-description">${product.description}</p>
      <p class="product-price">${formatter.format(product.price)}</p>
      <button class="add-to-cart-btn" data-product-id="${product.id}">Agregar al carrito</button>
    `;

    grid.appendChild(card);
  });

  // Ahora sí: asignamos listeners a los botones que ya están en el DOM
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      currentProductId = this.dataset.productId;

      document.getElementById('quantity-input').value = 1;

      document.getElementById('add-to-cart-modal').classList.remove('hidden');
    });
  });

  document.getElementById('confirm-add-btn').addEventListener('click', function () {
    const quantity = parseInt(document.getElementById('quantity-input').value);

    if (isNaN(quantity) || quantity <= 0) {
      alert('Cantidad inválida.');
      return;
    }

    addToCart(currentProductId, quantity);

    document.getElementById('add-to-cart-modal').classList.add('hidden');
  });


  document.getElementById('cancel-add-btn').addEventListener('click', function () {
    document.getElementById('add-to-cart-modal').classList.add('hidden');
  });
});
