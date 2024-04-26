import { Router } from "express"
import productManager from '../container/productos.js'

const productRouter = Router()

productRouter.get('/', async (req, res)=>{
    try{
        let {limit} = req.query
        let allProducts = await productManager.getProducts(limit)
        res.send(allProducts)
    } catch (error){
        res.status(500).send('Error to get products')
    }
})

productRouter.get('/:pid', async (req, res)=>{
    let productId = req.params.pid
    try {
        let product = await productManager.getProductById(productId)
        res.send(product)
    } catch (error) {
        res.status(404).send('Product not found')
    }
})

productRouter.post('/', async (req, res)=>{
    let product = req.body
    try {
        let newProduct = await productManager.addProduct(product)
        res.send(newProduct)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

export default productRouter