import DaoMongoDB from "../dao/mongoDb/DaoMongoDb.js"
import productModel from "../dao/mongoDb/models/productModel.js"
import cartModel from "../dao/mongoDb/models/cartModel.js"

export const productDao = new DaoMongoDB(productModel)
export const cartDao = new DaoMongoDB(cartModel)

const getById = async (id) => {
    try {
        return await cartDao.getCartProducts(id)
    } catch (error) {
        throw new Error(error)
    }
}

const create = async (obj) => {
    try {
        return await cartDao.create(obj)
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, obj) => {
    try {
        return await cartDao.update(id, obj, { new: true })
    } catch (error) {
        throw new Error(error)
    }
}

const updateOne = async (filter, obj) => {
    try {
        return await cartDao.updateOne(filter, obj, { new: true })
    } catch (error) {
        throw new Error(error)
    }
}

const findByIddelete = async (id) => {
    try {
        return await cartDao.delete(id)
    } catch (error) {
        throw new Error(error)
    }
}

const existProdInCart = async(cartId, prodId) => {
    try {
        return await cartDao.getOne({
            _id: cartId,
            products: { $elemMatch: { pid: prodId } }
        })
    } catch (error) {
        throw new Error(error)
    }
}

const addProdToCart = async(cartId, prodId, quantity) => {
    try {
        const cart = await cartDao.getOne({_id: cartId})
        if (!cart) return null
        await cart.products.push({ pid: prodId, quantity })
        await cart.save()
        return cart
    } catch (error) {
        console.log(error);
    }
}

const increaseProdQuantity = async(cid, pid, quantity) => {
    try {
        return await cartDao.increaseProdQuantity(cid, pid, quantity)
    } catch (error) {
        throw new Error(error)
    }
}

const deleteProduct = async(cid, pid) => {
    try {
        return await cartDao.deleteProd(cid, pid);
    } catch (error) {
        throw new Error(error)
    }
}

const cartService = {
    getById,
    create,
    update,
    updateOne,
    findByIddelete,
    existProdInCart,
    addProdToCart,
    increaseProdQuantity,
    deleteProduct
}

export default cartService