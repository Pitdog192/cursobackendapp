export default class DaoMongoDB {
    constructor(model) {
        this.model = model
    }

    async getOne(filter) {
        try {
            return await this.model.findOne(filter)
        } catch (error) {
            throw new Error(error)
        }
    }

    async getById(id) {
        try {
            return await this.model.findById(id)
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAll(query, limit = 10, page = 1, sortOrder) {
        try {
            return await this.model.paginate(query, {
                page: page,
                limit: limit,
                sort: sortOrder,
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    async create(obj) {
        try {
            return await this.model.create(obj)
        } catch (error) {
            throw new Error(error)
        }
    }

    async update(id, obj) {
        try {
            return await this.model.findByIdAndUpdate(id, obj, { new: true })
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateOne(filter, obj) {
        try {
            return await this.model.findOneAndUpdate(filter, obj, { new: true })
        } catch (error) {
            throw new Error(error)
        }
    }

    async delete(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error)
        }
    }

    async getCartProducts(id) {
        try {
            return await this.model.findById(id).populate({
                path: "products.pid",
                select: "title description code price status stock category",
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    async increaseProdQuantity(cid, pid, quantity) {
        try {
            return await this.model.findOneAndUpdate(
                { _id: cid, "products.pid": pid },
                { $set: { "products.$.quantity": quantity } },
                { new: true }
            );
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteProd(cid, pid) {
        try {
            return await this.model.findOneAndUpdate(
                { _id: cid },
                { $pull: { products: { pid: pid } } },
                { new: true }
            )
        } catch (error) {
            throw new Error(error)
        }
    }

    async removeProdToCart(cid, pid) {
        try {
            return await this.model.findOneAndUpdate(
                { _id: cid },
                { $pull: { products: { product: pid } } },
                { new: true }
            )
        } catch (error) {
            throw new Error(error)
        }
    }
}
