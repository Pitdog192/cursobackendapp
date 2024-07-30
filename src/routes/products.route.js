import { Router } from "express"
import productController from "../controllers/productsController.js"
import { checkAuth } from "../middlewares/jwt.js"
import { validateRole } from "../middlewares/errorHandler.js"

const productRouter = Router()

productRouter.get('/', checkAuth, validateRole, productController.getProducts)
productRouter.get('/:pid', checkAuth, validateRole, productController.getProduct)
productRouter.post('/', checkAuth, validateRole, productController.createProduct)
productRouter.put('/:pid', checkAuth, validateRole, productController.modifyProduct)
productRouter.delete('/:pid', checkAuth, validateRole, productController.deleteProduct)

export default productRouter