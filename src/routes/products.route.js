import { Router } from "express"
import productController from "../controllers/productsController.js"
import { checkAuth } from "../middlewares/jwt.js"
import { validateRole } from "../middlewares/errorHandler.js"

const productRouter = Router()

//MOCKING
productRouter.get('/mockingproducts', productController.productMock)

productRouter.get('/', checkAuth, validateRole, productController.getProducts)
productRouter.get('/getProdsApi', checkAuth, validateRole, productController.getProductsApiMode)
productRouter.get('/:pid', checkAuth, validateRole, productController.getProduct)
productRouter.post('/', checkAuth, validateRole, productController.createProduct)
productRouter.put('/:pid', checkAuth, validateRole, productController.modifyProduct)
productRouter.delete('/:pid', checkAuth, validateRole, productController.deleteProduct)
productRouter.delete('/', checkAuth, validateRole, productController.deleteAllProducts)


export default productRouter