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
  
viewsRouter.get('/profile', (req, res) => {
    const products = productController.getProducts()
    const user = req.session
    res.render('./users/profile', {user});
})

export default viewsRouter