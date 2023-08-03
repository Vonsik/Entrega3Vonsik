const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 8080;

app.get('/products', async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

  try {
    const productManager = new ProductManager('./products.txt');
    const products = await productManager.readProductsFromFile();

    if (limit) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos.' });
  }
});

app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);

  try {
    const productManager = new ProductManager('./products.txt');
    const products = await productManager.readProductsFromFile();

    const product = products.find((p) => p.id === productId);

    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado.' });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
