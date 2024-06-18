import userService from "../services/userservice.js"

const register = async (req, res)=>{
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