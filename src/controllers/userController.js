import userService from "../services/userservice.js"

const register = async (req, res)=>{
    try {
        const { email, password } = req.body;
        if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
            const user =  await userService.createUser({
                ...req.body,
                role: 'admin'
            })
            if (!user) res.status(401).json({ msg: 'El usuario admin ya existe!' })
            else res.redirect('/views/login')
        } else {
            const user = await userService.createUser(req.body);
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
        const user = await userService.searchUser({email, password})
        if(!user){
            res.status(401).json({ msg: 'No estas autorizado' })
        } else {
            req.session.data = {
                email: user.email,
                role: user.role
            }
            res.redirect('/views/profile')
        }
    } catch (error) {
        throw new Error(error)
    }
}

const logout = async(req, res) => {
    try {
        req.session.destroy()
        res.send('logout éxitoso')
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