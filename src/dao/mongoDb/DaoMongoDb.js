export default class DaoMongoDB {
    constructor(model) {
        this.model = model
    }

    async getById(id) {
        try {
            return await this.model.findById(id)
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAll(limit) {
        try {
            return await this.model.find({}).limit(Number(limit)).lean()
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

    async delete(id) {
        try {
            return await this.model.findByIdAndDelete(id)
        } catch (error) {
            throw new Error(error)
        }
    }
}
