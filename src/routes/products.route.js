import { Router } from "express"
import productController from "../controllers/productsController.js"
import { checkAuth } from "../middlewares/jwt.js"
import { validateRole } from "../middlewares/errorHandler.js"

const productRouter = Router()

//MOCKING
productRouter.get('/mockingproducts', productController.productMock)

productRouter.get('/', productController.getProducts)
productRouter.get('/getProdsApi', productController.getProductsApiMode)
productRouter.get('/:pid', productController.getProduct)
productRouter.post('/', productController.createProduct)
productRouter.put('/:pid', productController.modifyProduct)
productRouter.delete('/:pid', productController.deleteProduct)
productRouter.delete('/', productController.deleteAllProducts)


export default productRouter