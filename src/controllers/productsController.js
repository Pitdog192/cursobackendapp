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

const getProducts = async (req, res) => {
    try{
        const queryObj = req.query || {};
        let { query = '', page = 1, limit = 10, sort = 'asc' } = queryObj;
        let sortOrder = {}
        if(sort) sort === 'asc' ? sortOrder.price = 1 : sortOrder.price = -1
        let filter = {}
        if(query){
            if(query === 'true' || query === 'false'){
                filter.status = query
            } else{
                filter.category = query
            }
        }
        let allProducts = await productService.getAll(filter, limit, page, sortOrder)
        const prev = allProducts.hasPrevPage ? `http://localhost:8080/products?page=${res.prevpage}` : null
        const next = allProducts.hasNextPage ? `http://localhost:8080/products?page=${res.nextPage}` : null
        return {
            payload: allProducts.docs,
            totalPages: allProducts.totalPages,
            prevPage: allProducts.prevPage,
            nextPage: allProducts.nextPage,
            page: allProducts.page,
            hasPrevPage: allProducts.hasPrevPage, 
            hasNextPage: allProducts.hasNextPage,
            count: allProducts.totalDocs,
            prevLink: prev,
            nextLink: next
        }
    } catch (error){
        console.log(error);
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