import { Router } from "express"
import productManager from "../persistance/dao/fileSystem/container/productos.js"
import productController from "../controllers/productsController.js"
import { errorHandler, validateRole, validateAuth } from "../middlewares/errorHandler.js"

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

viewsRouter.get('/profile', validateAuth, validateRole , async (req, res) => {
    const products = await productController.getProducts(req, res)
    let envio = products.payload.map(product => product.toObject())
    const user = req.session.email
    const role = req.session.userRole
    res.render('home', { user: user, products : envio, role: role, nextPage: products.nextLink, prevPage: products.prevLink })
})

viewsRouter.get('/recovery_password', (req, res) =>{
    res.render('./users/recoverypassword')
})

viewsRouter.get('/sendrecoverymail', (req, res) =>{
    res.render('./users/sendmailtorecovery')
})

export default viewsRouter