// import cartManager from "../dao/fileSystem/container/carts.js"
import cartService from "../services/cartservice.js"
import productService from "../services/productservice.js"

const createCart = async (req, res, next) => {
    try {
        await cartService.create()
        // await cartManager.createCart()
        res.send(`Carrito creado con éxito`)
    } catch (error) {
        next(error)
    }
}

const getCartById = async(req,res, next) => {
    try {
        let cartId = req.params.cid
        let cartProducts = await cartService.getById(cartId)
        // let cartProducts = await cartManager.listCart(req.params.cid)
        res.send(cartProducts.products)
    } catch (error) {
        next(error)
    }
}

const insertProduct = async(req,res, next) => {
    try {
        let cartId = req.params.cid
        let pid = req.params.pid
        const findProdInCart = await cartService.existProdInCart(cartId, pid)
        console.log(findProdInCart);
        // const updatedCart = await cart.save()
        res.send('Producto agregado con éxito')
    } catch (error) {
        next(error)
    }
}

const deletProduct = async(req,res, next) => {
    try {
    } catch (error) {
        next(error)
    }
}

const cartController = {
    createCart,
    getCartById,
    insertProduct,
    deletProduct
}

export default cartController 