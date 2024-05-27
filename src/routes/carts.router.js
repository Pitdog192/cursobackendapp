import { Router } from "express"
import cartController from "../controllers/cartsController.js"

const cartRouter = Router()

cartRouter.post('/', cartController.createCart)
cartRouter.get('/:cid', cartController.getCartById)
cartRouter.post('/:cid/product/:pid', cartController.insertProduct)

export default cartRouter