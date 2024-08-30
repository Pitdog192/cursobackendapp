// import cartManager from "../dao/fileSystem/container/carts.js"
import cartService from "../services/cartservice.js"
import productService from "../services/productservice.js"
import { httpResponse } from "../utils/httpResponse.js"

const createCart = async (req, res, next) => {
    try {
        const cart = await cartService.create()
        // await cartManager.createCart()
        return httpResponse.Ok(res, `Carrito creado con éxito con ID: ${cart._id}`)
    } catch (error) {
        next(error)
    }
}

const getCartById = async(req, res, next) => {
    try {
        let {cid} = req.params
        let cartProducts = await cartService.getById(cid)
        // let cartProducts = await cartManager.listCart(req.params.cid)
        return httpResponse.Ok(res, cartProducts.products)
    } catch (error) {
        next(error)
    }
}

const insertProduct = async(req, res, next) => {
    try {
        let {pid , cid} = req.params
        const findProdInCart = await cartService.existProdInCart(cid, pid)
        if(findProdInCart){
            const error = new Error('Producto ya existente en el carrito')
            throw error
        } else{
            const productAdded = await cartService.addProdToCart(cid, pid)
            return httpResponse.Ok(res, `Producto agregado con éxito, ID: ${pid}`)
        }
    } catch (error) {
        next(error)
    }
}

const increaseProdQuantity = async(req, res, next) => {
    try {
        let {pid , cid} = req.params
        let {quantity} = req.body
        //comprobar si quantity es menor que stock y restarselo, si no avisar que no hay suficiente
        let product = await productService.getById(pid)
        if(product.stock < quantity) {
            const error = new Error('Stock insuficiente para agregar producto')
            throw error
        } else {
            const increasedQuantity = await cartService.increaseProdQuantity(cid, pid, quantity)
            if (!increasedQuantity) {
                const error = new Error('Error actualizando cantidad, carrito o producto no encontrado')
                throw error
            }
            return httpResponse.Ok(res, 'Cantidad actualizada con éxito')
        }
    } catch (error) {
        next(error)
    }
}

const delProduct = async(req, res, next) => {
    try {
        let {pid , cid} = req.params
        const deleteProduct = await cartService.deleteProduct(cid, pid)
        if (!deleteProduct) {
            return httpResponse.NotFound(res, 'Product | Cart not exist')
        } else {
            return httpResponse.Ok(res, 'Producto Eliminado con éxito')
        }
    } catch (error) {
        next(error)
    }
}

const finishPurchase = async(req, res, next) => {
    try {
        let user = req.user
        console.log(user);
        
        const ticket = await cartService.generateTicket(user)
        return httpResponse.Ok(res, ticket)
    } catch (error) {
        next(error)
    }
}

const cartController = {
    createCart,
    getCartById,
    insertProduct,
    increaseProdQuantity,
    delProduct,
    finishPurchase
}

export default cartController 