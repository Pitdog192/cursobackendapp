import DaoMongoDB from "../dao/mongoDb/DaoMongoDb.js"
import productModel from "../dao/mongoDb/models/productModel.js"

export const productDao = new DaoMongoDB(productModel)

const getById = async (id) => {
    try {
        return await productDao.getById(id)
    } catch (error) {
        throw new Error(error)
    }
}

const getAll = async (query, page, limit, sortOrder) => {
    try {
        return await productDao.getAll(query, page, limit, sortOrder)
    } catch (error) {
        throw new Error(error)
    }
}

const create = async (obj) => {
    try {
        return await productDao.create(obj)
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, obj) => {
    try {
        return await productDao.update(id, obj, { new: true })
    } catch (error) {
        throw new Error(error)
    }
}

const updateOne = async (filter, obj) => {
    try {
        return await productDao.updateOne(filter, obj, { new: true })
    } catch (error) {
        throw new Error(error)
    }
}

const findByIddelete = async (id) => {
    try {
        return await productDao.delete(id)
    } catch (error) {
        throw new Error(error)
    }
}

const productService = {
    getById,
    getAll,
    create,
    update,
    updateOne,
    findByIddelete
}

export default productService