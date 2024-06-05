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
        if(!findProdInCart){
            const productAdded = await cartService.addProdToCart(pid)
        }
        // const updatedCart = await cart.save()
        res.send('Producto agregado con éxito')
    } catch (error) {
        next(error)
    }
}

const delProduct = async(req,res, next) => {
    try {
        let {pid} = req.params
        let {cid} = req.params
        const deleteProduct = await cartService.deleteProduct(cid, pid)
        console.log(deleteProduct)
        if (!deleteProduct) res.json({ msg: "Product | Cart not exist" });
    } catch (error) {
        next(error)
    }
}

const cartController = {
    createCart,
    getCartById,
    insertProduct,
    delProduct
}

export default cartController 