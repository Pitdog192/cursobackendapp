import { Router } from "express"
import productManager from "../dao/fileSystem/container/productos.js"
import productController from "../controllers/productsController.js"
import { errorHandler } from "../middlewares/errorHandler.js"

const viewsRouter = Router()

viewsRouter.get('/', async(req, res ) => {
    const products = productManager.getProducts()
    res.render('realTimeProducts', {products})
})

viewsRouter.get('/register', (req, res) => {
    res.render('./users/register')
})

viewsRouter.get('/login', (req, res) => {
    res.render('./users/login')
})

viewsRouter.get('/profile', async (req, res) => {
    const products = await productController.getProducts(req, res)
    let envio = products.payload.map(product => product.toObject());
    const user = req.session
    res.render('home', { user: user, products : envio });
})

export default viewsRouter