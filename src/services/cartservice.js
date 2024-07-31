import persistence from '../persistance/dao/factory.js';
const { cartDao } = persistence;

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
        throw new Error(error)
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

const generateTicket = async(user) => {
    try {
        return await cartDao.generateTicket(user);
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
    deleteProduct,
    generateTicket
}

export default cartService