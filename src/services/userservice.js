import DaoMongoDB from "../dao/mongoDb/DaoMongoDb.js"
import userModel from "../dao/mongoDb/models/userModel.js"
const userDao = new DaoMongoDB(userModel)

const createUser = async(user) =>{
    try {
        const { email } = user
        const existUser = await userDao.getOne({ email })
        if(!existUser) return await userDao.create(user)
        else return null
    } catch (error) {
        throw new Error(error)
    }
}

const searchUser = async(filter) =>{
    try {
        const {email, password} = filter
        return await userDao.getOne({ email, password })
    } catch (error) {
        throw new Error(error)
    }
}

const userService = {
    createUser,
    searchUser
}

export default userService