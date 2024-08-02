import userService from "../services/userservice.js"
import {generateToken} from '../middlewares/jwt.js'

const register = async (req, res, next)=>{
    try {
        res.json({
            msg: 'Register OK',
            session: req.session
        })
    } catch (error) {
        next(error)
    }
}

const login = async(req, res, next) => {
    try {
        let id = null;
        if(req.session.passport && req.session.passport.user) id = req.session.passport.user;
        const user = await userService.searchUserById(id)
        //genero el token y seteo los header con authorization
        const token = generateToken(user)
        if(!user) res.status(401).json({ msg: 'Error de autenticacion' });
        const { email, role } = user;
        req.session.email = email
        req.session.role = role
        res.cookie('Authorization', token, { httpOnly: true, secure: true });
        res.redirect('/views/profile')
    } catch (error) {
        next(error)
    }
}

const githubLogin = async(req, res, next)=>{
    try {
        const { email } = req.user;
        req.session.email = email
        res.redirect('/views/profile')
    } catch (error) {
        next(error);
    }
}


const logout = async(req, res) => {
    try {
        req.session.destroy()
        res.redirect('/views/login')
    } catch (error) {
        throw new Error(error)
    }
}

const current = async(req,res) => {
    try {
        // const user = req.user
        const user = await userService.sendUserInfo(req.user)
        res.json({user: user})
    } catch (error) {
        throw new Error(error)
    }
}

const userController = {
    register,
    login,
    githubLogin,
    logout,
    current
}

export default userController