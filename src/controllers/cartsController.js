import cartManager from "../dao/container/carts.js"
import cartModel from "../dao/models/cartModel.js"
import productModel from '../dao/models/productModel.js'
import { v4 as uuidv4 } from 'uuid'

const createCart = async (req, res) => {
    try {
        await cartModel.create({ cid: uuidv4() })
        // await cartManager.createCart()
        res.send(`Carrito creado con éxito`)
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
}

const getCartById = async(req,res) => {
    try {
        let cartId = req.params.cid
        let cartProducts = await cartModel.findOne({ cid: cartId })
        // let cartProducts = await cartManager.listCart(req.params.cid)
        res.send(cartProducts.products)
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
}

const insertProduct = async(req,res) => {
    try {
        let pid = req.params.pid
        let product = await productModel.findOne({ pid: pid})
        if (!product) return res.status(404).send({ error: "Producto no encontrado" })
        let cartId = req.params.cid
        let cart = await cartModel.findOne({ cid: cartId })
        if (!cart) return res.status(404).send({ error: "Carrito no encontrado" })
        cart.products.push(product)
        await cart.save() // Guarda el carrito actualizado en la base de datos
        // let listCart = await cartManager.insertProduct(req.params.cid, req.params.pid)
        res.send('Producto agregado con éxito')
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
}

const cartController = {
    createCart,
    getCartById,
    insertProduct
}

export default cartController 