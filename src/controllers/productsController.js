import { v4 as uuidv4 } from 'uuid'
import productService from '../services/productservice.js'

const getProduct = async (req, res, next) => {
    let productId = req.params.pid
    try {
        let product = await productService.getById(productId)
        if(!product) res.status(404).json({ msg: "Product not Found" })
        // let product = await productManager.getProductById(productId)
        res.send(product)
    } catch (error) {
        next(error)
    }
}

const getProducts = async (req, res, next) => {
    try{
        let { query, page, limit, sort } = req.query
        console.log({ query, page, limit, sort })
        let allProducts = await productService.getAll(query, limit, page, sort)
        // let allProducts = await productManager.getProducts(limit)
        const response = {
            status: 'success',
            payload: [allProducts],
            totalPages: 10,
            page: 1,
            hasPrevPage: false,
            hasNextPage: true,
            prevLink: null,
            nextLink: '/products?page=2',
        }
        res.send(response)
    } catch (error){
        next(error)
    }
}

const createProduct = async (req, res, next) => {
    try {
        const { title, category, price, code, description, stock } = req.body;
        await productService.create({
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
        let updatedProduct = await productService.update(productId, req.body)
        // let updatedProduct = await productManager.updateProduct(req.params.pid, req.body)
        updatedProduct ? res.send(updatedProduct) : res.status(404).send({ error: "Producto no encontrado" })
    } catch (error) {
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        let productId = req.params.pid
        await productService.findByIddelete(productId)
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