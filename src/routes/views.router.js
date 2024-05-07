import { Router } from "express"
import productManager from "../container/productos.js"

const viewsRouter = Router()

viewsRouter.get('/', async(req, res ) => {
    const products = productManager.getProducts()
    res.render('realTimeProducts', {products})
})

export default viewsRouter