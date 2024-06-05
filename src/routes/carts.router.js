import { Router } from "express"
import cartController from "../controllers/cartsController.js"

const cartRouter = Router()

cartRouter.post('/', cartController.createCart)
cartRouter.get('/:cid', cartController.getCartById)
cartRouter.post('/:cid/product/:pid', cartController.insertProduct)
cartRouter.delete('/carts/:cid/products/:pid', cartController.delProduct)
cartRouter.put('/cart/:cid')
cartRouter.put('/cart/:cid/products/:pid')

export default cartRouter