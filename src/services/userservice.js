import { createHash, isValidPassword } from "../utils/passwordHash.js"
import { generateToken } from "../middlewares/jwt.js"
import persistence from '../persistance/dao/factory.js'
const { userDao, cartDao } = persistence;
import UserRepository from "../persistance/repository/user.repository.js"
import mongoose from "mongoose";
const userRepository = new UserRepository()

const searchUser = async (email) => {
    try {
        return await userDao.getOne({ email })
    } catch (error) {
        throw new Error(error)
    }
}

const searchUserById = async (id) => {
    try {
        return await userDao.getById(id)
    } catch (error) {
        throw new Error(error)
    }
}

const searchUserByEmail = async (email) => {
    try {
        return await userDao.getOne({email: email})
    } catch (error) {
        throw new Error(error)
    }
}

const searchCartById = async (id) => {
    try {
        return await userDao.getById(id)
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

const createUser = async (user) => {
    try {
        const { email, password } = user;
        const existUser = await searchUser(email)
        if (!existUser) {
            let userCart = await cartDao.create()
            if (!password) {
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
        if (!userExist.password) return null
        const passValid = isValidPassword(password, userExist)
        if (!passValid) return null
        //debería hacer un if(!userExist.cart) para crearle un carrito nuevo si se borró o al momento de añadir un producto
        return userExist
    } catch (error) {
        throw new Error(error)
    }
}

const generateResetPass = async (user) => {
    try {
        const token = generateToken(user, '1h');
        const expiresIn = 60 * 60 * 1000;
        const setUserToken = await userDao.setUserToken(user._id, token, expiresIn)
        return {setUserToken, token}
    } catch (error) {
        throw new Error(error)
    }
}

const updatePass = async (user, pass) => {
    try {
        const isEqual = isValidPassword(pass, user)
        if (isEqual) return null
        const newPass = createHash(pass)
        const updatedpassword = await userDao.updatePass(user._id, { password: newPass })
        return updatedpassword
    } catch (error) {
        throw new Error(error)
    }
}

const changePremium = async (user) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(user)) {
            console.warn(`ID inválido: ${user}`);
            return null;
        }
        const findedUser = await userDao.getById(user);
        
        if (!findedUser) {
            console.warn('El usuario no fue encontrado.');
            return null;  // Devuelve null si el usuario no es encontrado.
        }

        if (findedUser.role === 'premium') {
            const userchange = await userDao.updatePremium(user, { role: 'user' });
            return userchange;
        } else {
            const userchange = await userDao.updatePremium(user, { role: 'premium' });
            return userchange;  // Devuelve el usuario modificado.
        }
    } catch (error) {
        console.error('Error al cambiar a premium:', error.message);
        throw error;  // Lanza el error nuevamente.
    }
};

const last_connection = async (user, newDate) => {
    try {
        let userDate = await userDao.last_connection(user, newDate);
        return userDate;
    } catch (error) {
        console.error('Error al establecer la fecha de ingreso:', error.message);
        throw error;  // Lanza el error nuevamente.
    }
};

const uploadImage = async (image) => { //Llega un objeto con propiedades name, link y id del user
    try {
        let userDate = await userDao.uploadImage(image);
        return userDate;
    } catch (error) {
        console.error('Error al establecer la fecha de ingreso:', error.message);
        throw error;  // Lanza el error nuevamente.
    }
};

const userService = {
    createUser,
    loginUser,
    searchUser,
    searchUserByEmail,
    sendUserInfo,
    generateResetPass,
    updatePass,
    changePremium,
    last_connection,
    searchCartById,
    searchUserById,
    uploadImage
}

export default userService