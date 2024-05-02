import { Router } from "express"
import cartManager from "../container/carts.js"

const cartRouter = Router()

cartRouter.post('/', async (req, res) => {
    try {
        await cartManager.createCart()
        res.send(`Carrito creado con éxito`)
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
})

cartRouter.get('/:cid', async(req,res) => {
    try {
        let cartProducts = await cartManager.listCart(req.params.cid)
        res.send(cartProducts)
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
})

cartRouter.post('/:cid/product/:pid', async(req,res) => {
    try {
        let listCart = await cartManager.insertProduct(req.params.cid, req.params.pid)

        res.send('Producto agregado con éxito')
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
})

export default cartRouter