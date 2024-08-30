import { Router } from "express"
import cartController from "../controllers/cartsController.js"
import { checkAuth } from "../middlewares/jwt.js"

const cartRouter = Router()

cartRouter.post('/', cartController.createCart)
cartRouter.get('/:cid', cartController.getCartById)
cartRouter.post('/:cid/product/:pid', cartController.insertProduct)
cartRouter.delete('/:cid/product/:pid', cartController.delProduct)
cartRouter.put('/:cid/product/:pid', cartController.increaseProdQuantity)
cartRouter.post('/:cid/purchase', cartController.finishPurchase)

export default cartRouter