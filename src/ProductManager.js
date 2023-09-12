const fs = require("fs")

class ProductManager {
    constructor(path) {
        this.path = path
    }

    async getProducts() {
        const data = await fs.promises.readFile(this.path, 'utf8')
        const productos = JSON.parse(data)
        return productos;
    }

    async getProductById(productId) {
        const productos = await this.getProducts()
        const productoEncontrado = productos.find(p => p.id == productId)
        return productoEncontrado
    }
}

module.exports = ProductManager;