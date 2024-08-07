import { createHash, isValidPassword } from "../utils/passwordHash.js"
import persistence from '../persistance/dao/factory.js'
const { userDao, cartDao } = persistence;
import UserRepository from "../persistance/repository/user.repository.js"
const userRepository = new UserRepository()

const searchUser = async(email) =>{
    try {
        return await userDao.getOne({ email })
    } catch (error) {
        throw new Error(error)
    }
}

const searchUserById = async(id) =>{
    try {
        return await userDao.getCartById(id)
    } catch (error) {
        throw new Error(error)
    }
}

const sendUserInfo = async (user) => {
    try {
        const userInfo = await userRepository.sendUserInfo(user)
        return userInfo
    } catch (error) {
        throw new Error(error)
    }
}

const createUser = async(user) =>{
    try {
        const { email, password } = user;
        const existUser = await searchUser(email)
        if (!existUser) {
            let userCart = await cartDao.create()
            if(!password){
                const newUser = await userDao.create({
                    ...user,
                    githubUser: true,
                    cart: userCart._id
                })
                return newUser
            } else {
                if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
                    const newUser = await userDao.create({
                        ...user,
                        password: createHash(password),
                        role: "admin",
                        cart: userCart._id
                    })
                    return newUser
                } else {
                const newUser = await userDao.create({
                    ...user,
                    password: createHash(password),
                    cart: userCart._id
                })
                return newUser
            }
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
        if(!userExist.password) return null
        const passValid = isValidPassword(password, userExist)
        if (!passValid) return null
        //debería hacer un if(!userExist.cart) para crearle un carrito nuevo si se borró o al momento de añadir un producto
        return userExist
    } catch (error) {
        throw new Error(error)
    }
}


const userService = {
    createUser,
    loginUser,
    searchUser,
    searchUserById,
    sendUserInfo
}

export default userService