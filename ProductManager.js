const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async readProductsFromFile() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      const lines = data.trim().split('\n');
      const products = lines.map((line) => {
        const [producto, talle, precio, id] = line.split(', ');
        return { producto, talle, precio: parseFloat(precio), id: parseInt(id) };
      });
      return products;
    } catch (error) {
      console.error('Error al leer el archivo:', error.message);
      throw error;
    }
  }
}

module.exports = ProductManager;
