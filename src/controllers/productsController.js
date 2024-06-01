// import productManager from '../dao/fileSystem/container/productos.js'
import productModel from "../dao/mongoDb/models/productModel.js"
import DaoMongoDB from '../dao/mongoDb/DaoMongoDb.js'
import { v4 as uuidv4 } from 'uuid'

export const productDao = new DaoMongoDB(productModel)
const getProduct = async (req, res, next) => {
    let productId = req.params.pid
    try {
        let product = await productDao.getById(productId)
        if(!product) res.status(404).json({ msg: "Product not Found" })
        // let product = await productManager.getProductById(productId)
        res.send(product)
    } catch (error) {
        next(error)
    }
}

const getProducts = async (req, res, next) => {
    try{
        let {limit} = req.query
        let allProducts = await productDao.getAll()
        // let allProducts = await productManager.getProducts(limit)
        res.send({allProducts})
    } catch (error){
        next(error)
    }
}

const createProduct = async (req, res, next) => {
    try {
        const { title, category, price, code, description, stock } = req.body;
        await productDao.create({
        pid: uuidv4(),
        title,
        category,
        price,
        code,
        description,
        stock
    })
        // let newProduct = await productManager.addProduct(product)
        res.send({message: "Producto creado con éxito"})
    } catch (error) {
        next(error)
    }
}

const modifyProduct = async (req, res, next) => {
    try {
        let productId = req.params.pid
        let updatedProduct = await productDao.update(productId, req.body)
        // let updatedProduct = await productManager.updateProduct(req.params.pid, req.body)
        updatedProduct ? res.send(updatedProduct) : res.status(404).send({ error: "Producto no encontrado" })
    } catch (error) {
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        let productId = req.params.pid
        await productDao.delete(productId)
        // await productManager.deleteProduct(req.params.pid)
        res.send({message: "Producto eliminado con éxito"})
    } catch (error) {
        console.log(error)
        next(error)
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