// Formatter for costarrican colones.
const formatter = new Intl.NumberFormat("es-CR", {
  style: "currency",
  currency: "CRC",
  minimumFractionDigits: 0,
});

const products = [
  {
    name: "Shampoo Natural",
    description: "Ideal para todo tipo de cabello. Libre de sulfatos.",
    price: 4500,
    image: "../img/natural_shampoo.jpg",
    category: "Cuidado Personal"
  },
  {
    name: "Crema Facial Hidratante",
    description: "Hidrata y nutre la piel sin dejar sensacion grasosa.",
    price: 6420,
    image: "../img/facial_cream.jpeg",
    category: "Cuidado Personal"
  },
  {
    name: "Blusa de Algodon",
    description: "Ropa comoda y fresca para el dia a dia.",
    price: 8900,
    image: "../img/blouse.png",
    category: "Ropa y Accesorios"
  },
  {
    name: "Suplemento Vitaminico",
    description: "Refuerza tu sistema inmune con vitaminas esenciales.",
    price: 3750,
    image: "../img/vitamin_suplement.jpeg",
    category: "Cuidado Personal"
  },
  {
    name: "Shampoo Revitalizante",
    description: "Ideal para cabello seco y maltratado.",
    price: 3500,
    image: "../img/revitalant_shampoo.jpg",
    category: "Cuidado Personal"
  },
  {
    name: "Crema Hidratante",
    description: "Manten tu piel suave todo el dia.",
    price: 2800,
    image: "../img/hidratant_cream.avif",
    category: "Cuidado Personal"
  },
  {
    name: "Camiseta Estilo Panama",
    description: "Ligera, fresca y con mucho flow.",
    price: 6000,
    image: "../img/panama_shirt.jpg",
    category: "Ropa y Accesorios"
  },
  /* ======================================================================== */
  {
    name: "Aceite Esencial de Lavanda",
    description: "Relajante natural para aromaterapia o masajes.",
    price: 5200,
    image: "../img/lavender_oil.jpg",
    category: "Cuidado Personal"
  },
  {
    name: "Jabon Artesanal de Avena",
    description: "Suave con la piel, ideal para piel sensible.",
    price: 2500,
    image: "../img/oat_soap.jpg",
    category: "Cuidado Personal"
  },
  {
    name: "Pantalon Deportivo Unisex",
    description: "Comodo y versatil para cualquier actividad.",
    price: 9900,
    image: "../img/sport_pants.jpg",
    category: "Ropa y Accesorios"
  },
  {
    name: "Mochila Ecologica",
    description: "Hecha con materiales reciclados, resistente y liviana.",
    price: 11500,
    image: "../img/backpack.jpg",
    category: "Ropa y Accesorios"
  },
  {
    name: "Toalla de Microfibra Compacta",
    description: "Absorbe rapido y es facil de guardar.",
    price: 3700,
    image: "../img/towel.webp",
    category: "Bienestar y Hogar"
  },
  {
    name: "Protector Solar Mineral SPF 50",
    description: "Protege tu piel sin quimicos agresivos.",
    price: 8200,
    image: "../img/sunscreen.jpg",
    category: "Cuidado Personal"
  },
  {
    name: "Infusor de Te Reutilizable",
    description: "Ideal para preparar tus mezclas de te favoritas.",
    price: 1800,
    image: "../img/tea_infuser.jpg",
    category: "Bienestar y Hogar"
  },
  {
    name: "Set de Velas Aromaticas Naturales",
    description: "Hechas con cera de soya y aceites esenciales.",
    price: 7600,
    image: "../img/candles.jpg",
    category: "Bienestar y Hogar"
  },
  {
    name: "Desodorante Natural en Barra",
    description: "Libre de aluminio y fragancias artificiales.",
    price: 4300,
    image: "../img/deodorant.jpg",
    category: "Cuidado Personal"
  },
  {
    name: "Bolso de Mano de Yute",
    description: "Perfecto para compras o salidas casuales",
    price: 7900,
    image: "../img/jute_bag.avif",
    category: "Ropa y Accesorios"
  },
];

// Dynamic Render of Products
const grid = document.getElementById("product-grid");

products.forEach((product) => {
  const card = document.createElement("div");
  card.classList.add("product-card");

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}"
class="product-image"/>
    <h3 class="product-name">${product.name}</h3>
    <p class="product-description">${product.description}</p>
    <p class="product-price">${formatter.format(product.price)}</p>
    <button class="add-to-cart-btn">Agregar al carrito</button>
  `;

  grid.appendChild(card);
});