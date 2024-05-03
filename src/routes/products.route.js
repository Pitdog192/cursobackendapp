import { Router } from "express"
import productManager from '../container/productos.js'

const productRouter = Router()

productRouter.get('/', async (req, res)=>{
    try{
        let {limit} = req.query
        let allProducts = await productManager.getProducts(limit)
        res.render('home', {allProducts})
        console.log("test")
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
        res.status(404).send({ error: error.message })
    }
})

productRouter.post('/', async (req, res)=>{
    let product = req.body
    try {
        let newProduct = await productManager.addProduct(product)
        res.send(newProduct)
    } catch (error) {
        console.log(error)
        res.status(404).send({ error: error.message })
    }
})

productRouter.put('/:pid', async (req, res) =>{
    try {
        let updatedProduct = await productManager.updateProduct(req.params.pid, req.body)
        res.send(updatedProduct)
    } catch (error) {
        console.log(error)
        res.status(404).send({ error: error.message })
    }
})

productRouter.delete('/:pid', async (req,res) => {
    try {
        await productManager.deleteProduct(req.params.pid)
        res.send("Producto eliminado con éxito")
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message })
    }
})

export default productRouter