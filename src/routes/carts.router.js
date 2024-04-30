import { Router } from "express"
import cartManager from "../container/carts.js"

const cartRouter = Router()

cartRouter.post('/', async (req, res) => {
    try {
        await cartManager.createCart()
        res.send(`Carrito creado con éxito`)
    } catch (error) {
        res.send({error})
    }
})

export default cartRouter