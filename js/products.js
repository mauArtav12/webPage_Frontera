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
    image: "../img/shampoo.jpg"
  },
  {
    name: "Crema Facial Hidratante",
    description: "Hidrata y nutre la piel sin dejar sensacion grasosa.",
    price: 6420,
    image: "../img/facialcream.jpeg"
  },
  {
    name: "Blusa de Algodon",
    description: "Ropa comoda y fresca para el dia a dia.",
    price: 8900,
    image: "../img/blouse.png"
  },
  {
    name: "Suplemento Vitaminico",
    description: "Refuerza tu sistema inmune con vitaminas esenciales.",
    price: 3750,
    image: "../img/vitamins.jpeg"
  },
  {
    name: "Shampoo Revitalizante",
    description: "Ideal para cabello seco y maltratado.",
    price: 3500,
    image: "../img/shampoo.jpg"
  },
  {
    name: "Crema Hidratante",
    description: "Manten tu piel suave todo el dia..",
    price: 2800,
    image: "../img/facialcream.jpeg"
  },
  {
    name: "Camiseta Estilo Panama",
    description: "Ligera, fresca y con mucho flow.",
    price: 6000,
    image: "../img/blouse.png"
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