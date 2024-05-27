import productManager from '../dao/container/productos.js'
import productModel from "../dao/models/productModel.js"
import { v4 as uuidv4 } from 'uuid'

const getProduct = async (req, res) => {
    let productId = req.params.pid
    try {
        let product = await productModel.findOne({ pid: productId })
        // let product = await productManager.getProductById(productId)
        res.send(product)
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
}

const getProducts = async (req, res) => {
    try{
        let {limit} = req.query
        let allProducts = await productModel.find({}).limit(Number(limit)).lean()
        // let allProducts = await productManager.getProducts(limit)
        res.render('home', {allProducts})
    } catch (error){
        res.status(500).send('Error to get products')
    }
}

const createProduct = async (req, res) => {
    let product = new productModel({
        pid: uuidv4(),
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        code: req.body.code,
        description: req.body.description,
        stock: req.body.stock,
        status: true
    })
    try {
        await productModel.create(product)
        // let newProduct = await productManager.addProduct(product)
        res.send({message: "Producto creado con éxito"})
    } catch (error) {
        console.log(error)
        res.status(404).send({ error: error.message })
    }
}

const modifyProduct = async (req, res) => {
    try {
        let productId = req.params.pid;
        let updatedProduct = await productModel.findOneAndUpdate({ pid: productId }, req.body, { new: true })
        // let updatedProduct = await productManager.updateProduct(req.params.pid, req.body)
        updatedProduct ? res.send(updatedProduct) : res.status(404).send({ error: "Producto no encontrado" })
    } catch (error) {
        console.log(error)
        res.status(404).send({ error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        let productId = req.params.pid;
        await productModel.findOneAndDelete({ pid: productId });
        // await productManager.deleteProduct(req.params.pid)
        res.send({message: "Producto eliminado con éxito"})
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message })
    }
}

const productController= {
    getProduct,
    getProducts,
    createProduct,
    modifyProduct,
    deleteProduct
}

export default productController