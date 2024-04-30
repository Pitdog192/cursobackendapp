import { Router } from "express"
import cartManager from "../container/carts.js"
import productManager from "../container/productos.js"

const cartRouter = Router()

cartRouter.post('/', async (req, res) => {
    try {
        await cartManager.createCart()
        res.send(`Carrito creado con éxito`)
    } catch (error) {
        res.send({error})
    }
})

cartRouter.get('/:cid', async(req,res) => {
    try {
        let cartProducts = await cartManager.listCart(req.params.cid)
        res.send(cartProducts)
    } catch (error) {
        res.send({error})
    }
})

cartRouter.post('/:cid/products/:pid', async(req,res) => {
    try {

    } catch (error) {
        res.send({error})
    }
})

export default cartRouter