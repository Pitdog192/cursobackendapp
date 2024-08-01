import { Router } from "express"
import cartController from "../controllers/cartsController.js"
import { checkAuth } from "../middlewares/jwt.js"

const cartRouter = Router()

cartRouter.post('/', cartController.createCart)
cartRouter.get('/:cid', cartController.getCartById)
cartRouter.post('/:cid/product/:pid', checkAuth, cartController.insertProduct)
cartRouter.delete('/:cid/products/:pid', checkAuth, cartController.delProduct)
cartRouter.put('/:cid/products/:pid', checkAuth, cartController.increaseProdQuantity)
cartRouter.post('/:cid/purchase', checkAuth, cartController.finishPurchase)

export default cartRouter