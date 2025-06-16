const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'products.json');

app.use(cors());
app.use(express.json()); // body-parser ya está integrado

// Leer productos del archivo JSON
function readProducts() {
  return new Promise((resolve, reject) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
      if (err) return reject(err);
      try {
        const products = JSON.parse(data);
        resolve(products);
      } catch (parseErr) {
        reject(parseErr);
      }
    });
  });
}

// Guardar productos en el archivo JSON
function saveProducts(products) {
  return new Promise((resolve, reject) => {
    fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), 'utf8', err => {
      if (err) return reject(err);
      resolve();
    });
  });
}

// GET /products - listar todos los productos
app.get('/products', async (req, res) => {
  try {
    const products = await readProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error leyendo productos' });
  }
});

// POST /products - agregar un nuevo producto
app.post('/products', async (req, res) => {
  const newProduct = req.body;

  try {
    const products = await readProducts();

    const maxId = Math.max(...products.map(p => p.id), 0);
    newProduct.id = maxId + 1;

    products.push(newProduct);
    await saveProducts(products);

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error guardando producto' });
  }
});

// PUT /products/:id - actualizar producto existente
app.put('/products/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedProduct = req.body;

  try {
    const products = await readProducts();

    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    updatedProduct.id = id;
    products[index] = updatedProduct;

    await saveProducts(products);
    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando producto' });
  }
});

// DELETE /products/:id - eliminar producto
app.delete('/products/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const products = await readProducts();
    const newProducts = products.filter(p => p.id !== id);

    if (newProducts.length === products.length) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await saveProducts(newProducts);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando producto' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
