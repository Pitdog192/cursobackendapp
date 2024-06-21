import DaoMongoDB from "../dao/mongoDb/DaoMongoDb.js"
import userModel from "../dao/mongoDb/models/userModel.js"
import { createHash, isValidPassword } from "../utils.js";
const userDao = new DaoMongoDB(userModel)

const searchUser = async(email) =>{
    try {
        return await userDao.getOne({ email })
    } catch (error) {
        throw new Error(error)
    }
}

const searchUserById = async(id) =>{
    try {
        return await userDao.getById(id)
    } catch (error) {
        throw new Error(error)
    }
}

const createUser = async(user) =>{
    try {
        console.log(user);
        const { email, password } = user;
        const existUser = await searchUser(email)
        if (!existUser) {
            if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
                const newUser = await userDao.create({
                    ...user,
                    password: createHash(password),
                    role: "admin",
                })
                return newUser
            } else {
            const newUser = await userDao.create({
                ...user,
                password: createHash(password),
            })
            return newUser
        }
        } else return null
    } catch (error) {
        throw new Error(error)
    }
}

const loginUser = async (user) => {
    try {
        const { email, password } = user
        const userExist = await searchUser(email)
        if (!userExist) return null
        const passValid = isValidPassword(password, userExist)
        if (!passValid) return null
        return userExist
    } catch (error) {
        throw new Error(error)
    }
}


const userService = {
    createUser,
    loginUser,
    searchUser,
    searchUserById
}

export default userService