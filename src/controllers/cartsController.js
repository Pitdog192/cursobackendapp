// import cartManager from "../dao/fileSystem/container/carts.js"
import cartModel from "../dao/mongoDb/models/cartModel.js"
import DaoMongoDB from "../dao/mongoDb/DaoMongoDb.js"
import { productDao } from "./productsController.js"

const cartDao = new DaoMongoDB(cartModel)

const createCart = async (req, res, next) => {
    try {
        await cartDao.create()
        // await cartManager.createCart()
        res.send(`Carrito creado con éxito`)
    } catch (error) {
        next(error)
    }
}

const getCartById = async(req,res, next) => {
    try {
        let cartId = req.params.cid
        let cartProducts = await cartDao.getById(cartId)
        // let cartProducts = await cartManager.listCart(req.params.cid)
        res.send(cartProducts.products)
    } catch (error) {
        next(error)
    }
}

const insertProduct = async(req,res, next) => {
    try {
        let pid = req.params.pid
        let product = await productDao.getById(pid)
        if (!product) return res.status(404).send({ error: "Producto no encontrado" })
        let cartId = req.params.cid
        let cart = await cartDao.getById(cartId)
        if (!cart) return res.status(404).send({ error: "Carrito no encontrado" })
        const newProduct = cart.products.find(p => p.pid.toString() === pid.toString())
        if (!newProduct) {
            cart.products.push({ pid: product._id, quantity: 1 })
        } else {
            newProduct.quantity += 1
        }
        const updatedCart = await cart.save()
        console.log(updatedCart);
        // let listCart = await cartManager.insertProduct(req.params.cid, req.params.pid)
        res.send('Producto agregado con éxito')
    } catch (error) {
        next(error)
    }
}

const cartController = {
    createCart,
    getCartById,
    insertProduct
}

export default cartController 