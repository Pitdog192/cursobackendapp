import userService from "../services/userservice.js"
import { createHash, isValidPassword } from "../utils.js";

const register = async (req, res)=>{
    try {
        const { email, password } = req.body;
        if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
            const user =  await userService.createUser({
                ...req.body,
                password: createHash(req.body.password),
                role: 'admin'
            })
            if (!user) res.status(401).json({ msg: 'El usuario admin ya existe!' })
            else res.redirect('/views/login')
        } else {
            const user = await userService.createUser({
                ...req.body,
                password: createHash(req.body.password)
            });
            if (!user) res.status(401).json({ msg: 'El usuario ya existe!' })
            else res.redirect('/views/login')
        }
    } catch (error) {
        throw new Error(error)
    }
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await userService.searchUser(email)
        if(!user) res.status(401).json({ msg: 'No estas autorizado' })
        if(isValidPassword(password, user)){
            req.session.email = email;
            req.session.role = user.role;
            res.redirect("/views/profile");
        } else {
            res.status(401).json({ msg: "Autenticación fallida" });
        }
    } catch (error) {
        throw new Error(error)
    }
}


//**
 * 
 * @param {*} req 
 * @param {*} res 
 */

const logout = async(req, res) => {
    try {
        req.session.destroy()
        res.redirect('/views/login')
    } catch (error) {
        throw new Error(error)
    }
}

const userController = {
    register,
    login,
    logout
}

export default userController