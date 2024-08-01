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

const getCartById = async(req, res, next) => {
    try {
        let {cid} = req.params
        let cartProducts = await cartService.getById(cid)
        // let cartProducts = await cartManager.listCart(req.params.cid)
        res.send(cartProducts.products)
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
            res.send('Cantidad actualizada con éxito')
        }
    } catch (error) {
        next(error)
    }
}

const delProduct = async(req, res, next) => {
    try {
        let {pid , cid} = req.params
        const deleteProduct = await cartService.deleteProduct(cid, pid)
        if (!deleteProduct) res.json({ msg: "Product | Cart not exist" })
        res.send('Producto Eliminado con éxito')
    } catch (error) {
        next(error)
    }
}

const finishPurchase = async(req, res, next) => {
    try {
        let user = req.user
        const ticket = await cartService.generateTicket(user)
        res.send(ticket)
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