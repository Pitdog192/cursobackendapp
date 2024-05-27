import { Router } from "express"
import productController from "../controllers/productsController.js"

const productRouter = Router()

productRouter.get('/', productController.getProducts)
productRouter.get('/:pid', productController.getProduct)
productRouter.post('/', productController.createProduct)
productRouter.put('/:pid', productController.modifyProduct)
productRouter.delete('/:pid', productController.deleteProduct)

export default productRouter