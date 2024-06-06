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
        let {cid} = req.params
        let cartProducts = await cartService.getById(cid)
        // let cartProducts = await cartManager.listCart(req.params.cid)
        res.send(cartProducts.products)
    } catch (error) {
        next(error)
    }
}

const insertProduct = async(req,res, next) => {
    try {
        let {pid , cid} = req.params
        const findProdInCart = await cartService.existProdInCart(cid, pid)
        if(!findProdInCart){
            const productAdded = await cartService.addProdToCart(cid, pid)
            console.log(productAdded);
        } else{
            res.send('Producto ya existente en el carrito')
        }
        // const updatedCart = await cart.save()
        res.send('Producto agregado con éxito')
    } catch (error) {
        next(error)
    }
}

const increaseProdQuantity = async(req, res, next) => {
    try {
        let {pid , cid} = req.params
        let {quantity} = req.body
        const increasedQuantity = await cartService.increaseProdQuantity(cid, pid, quantity)
        if (!increasedQuantity) res.send('Error actualizando cantidad, carrito o producto no encontrado')
        res.send('Cantidad actualizada con éxito')
    } catch (error) {
        next(error)
    }
}

const delProduct = async(req,res, next) => {
    try {
        let {pid , cid} = req.params
        const deleteProduct = await cartService.deleteProduct(cid, pid)
        if (!deleteProduct) res.json({ msg: "Product | Cart not exist" })
    } catch (error) {
        next(error)
    }
}

const cartController = {
    createCart,
    getCartById,
    insertProduct,
    increaseProdQuantity,
    delProduct
}

export default cartController 