import { Router } from "express"
import cartController from "../controllers/cartsController.js"

const cartRouter = Router()

cartRouter.post('/', cartController.createCart)
cartRouter.get('/:cid', cartController.getCartById)
cartRouter.post('/:cid/product/:pid', cartController.insertProduct)
cartRouter.delete('/:cid/products/:pid', cartController.delProduct)
cartRouter.put('/:cid/products/:pid', cartController.increaseProdQuantity)
cartRouter.put('/:cid') // NO ENTIENDO QUE TENDRÍA QUE HACER ESTA RUTA

export default cartRouter