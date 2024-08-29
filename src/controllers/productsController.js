import { v4 as uuidv4 } from 'uuid'
import productService from '../services/productservice.js'
import { httpResponse } from "../utils/httpResponse.js"
import { logger } from '../utils/logger.js'

const getProduct = async (req, res, next) => {
    let productId = req.params.pid
    try {
        let product = await productService.getById(productId)
        if(!product) return httpResponse.NotFound(res, 'Product not exist')
        return httpResponse.Ok(res, product)
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
        console.log(queryObj);
        
        const prev = allProducts.hasPrevPage ? `http://localhost:8080/views/profile?page=${allProducts.prevpage}` : null
        const next = allProducts.hasNextPage ? `http://localhost:8080/views/profile?page=${allProducts.nextPage}` : null
        return{
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
        logger.error(error);
    }
}

const getProductsApiMode = async(req, res) => {
    try {
        const products = await getProducts(req);
        console.log(products.payload);
        
        res.send(products.payload)
    } catch (error) {
        logger.error(error);
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
        return httpResponse.Ok(res, 'Producto creado con éxito')
    } catch (error) {
        next(error)
    }
}

const modifyProduct = async (req, res, next) => {
    try {
        let productId = req.params.pid
        let updatedProduct = await productService.update(productId, req.body)
        updatedProduct ? httpResponse.Ok(res, updatedProduct) : httpResponse.NotFound(res, 'Producto no encontrado')
    } catch (error) {
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        let productId = req.params.pid
        await productService.findByIddelete(productId)
        return httpResponse.Ok(res, 'Producto eliminado con éxito')
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const productMock = async (req, res, next) => {
    try {
        let mockingproducts = await productService.productMock()
        return httpResponse.Ok(res, mockingproducts)
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
    deleteProduct,
    productMock,
    getProductsApiMode
}

export default productController