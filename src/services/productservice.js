import persistence from '../persistance/dao/factory.js';
import generateProduct from '../utils/mock.js';
const { productDao } = persistence;
import ProductRepository from '../persistance/repository/product.repositoy.js';
const productRepo = new ProductRepository()

const getById = async (id) => {
    try {
        return productRepo.getById(id)
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

const productMock = async () => {
    try {
        let mock = []
        for (let i = 0; i < 100; i++) {
            let productMock = generateProduct()
            mock.push(productMock)
        }
        return mock
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
    findByIddelete,
    productMock
}

export default productService