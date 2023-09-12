const express = require("express")
const ProductManager = require("./ProductManager")

const app = express()
const PUERTO = 8080
const Carrito = new ProductManager("./src/productos.txt")

app.use(express.urlencoded({ extended: true }))

app.get("/products", async (req, res) => {

    const { limit } = req.query
    const productos = await Carrito.getProducts()

    if (limit > 0) {
        res.json(productos.slice(0, limit))
    } else {
        res.json(productos)
    }
})

app.get("/products/:pid", async (req, res) => {

    const { pid } = req.params
    const producto = await Carrito.getProductById(pid)

    if (!producto) {
        res.json({
            error: `Producto con id ${pid} no encontrado`
        })
    } else {
        res.json(producto)
    }
})

app.listen(PUERTO, () => console.log(`Servidor corriendo en el puerto ${PUERTO}`))