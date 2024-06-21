import userService from "../services/userservice.js"

const register = async (req, res, next)=>{
    try {
        console.log("entro al register del controller");
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
        const user = await userService.searchUserById(id);
        if(!user) res.status(401).json({ msg: 'Error de autenticacion' });
        const { email, role } = user;
        req.session.email = email
        req.session.role = role
        console.log(req.session);
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

const userController = {
    register,
    login,
    githubLogin,
    logout
}

export default userController