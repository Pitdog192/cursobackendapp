import userService from "../services/userservice.js"
import { generateToken } from '../middlewares/jwt.js'
import { httpResponse } from "../utils/httpResponse.js"
import { logger } from "../utils/logger.js"
import { formatDate } from "../utils/utils.js"

const register = async (req, res, next) => {
    try {
        return httpResponse.Ok(res, {
            msg: 'Register OK',
            session: req.session
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        let id = null;
        if (req.session.passport && req.session.passport.user) id = req.session.passport.user;
        const user = await userService.searchUserById(id)
        //genero el token y seteo los header con authorization
        const token = generateToken(user)
        if (!user) res.status(401).json({ msg: 'Error de autenticacion' });
        const { email, role } = user;
        req.session.email = email
        req.session.role = role
        res.cookie('Authorization', token, { httpOnly: true, secure: true });
        res.redirect('/views/profile')
    } catch (error) {
        next(error)
    }
}

const githubLogin = async (req, res, next) => {
    try {
        const { email } = req.user;
        req.session.email = email
        res.redirect('/views/profile')
    } catch (error) {
        next(error);
    }
}


const logout = async (req, res) => {
    try {
        const {email} = req.session
        const userLogin = await userService.searchUserByEmail(email);
        if (!userLogin) throw new Error('Usuario no encontrado');

        const newLoginDate = formatDate(new Date()); // Fecha actual
        let userDate = await userService.last_connection(userLogin._id, newLoginDate);
        if (!userDate) throw new Error('Error al establecer la fecha: ' + newLoginDate);

        req.session.destroy((err) => {
            if (err) {
                console.error('Error al destruir la sesión:', err);
                return res.status(500).send('Error al cerrar sesión');
            }
            res.redirect('/views/login');
        });
    } catch (error) {
        console.error('Error en el proceso de cierre de sesión:', error.message);
        res.status(500).send('Error en el cierre de sesión: ' + error.message);
    }
}

const current = async (req, res) => {
    try {
        // const user = req.user
        const user = await userService.sendUserInfo(req.user)
        return httpResponse.Ok(res, { user: user })
    } catch (error) {
        throw new Error(error)
    }
}

const updatePass = async (req, res, next) => {
    try {
        const user = req.user;
        const { pass1, pass2 } = req.body;
        const { tokenpass } = req.cookies;
        if (pass1 !== pass2) {
            return httpResponse.NotFound(res, { msg: 'pass1 and pass2 need to be the same' });
        }
        if (!tokenpass) {
            return httpResponse.Unauthorized(res, { msg: 'Invalid Token' });
        }
        const updPass = await userService.updatePass(user, pass1);
        console.log(updPass);
        
        if (!updPass) {
            return httpResponse.NotFound(res, { msg: 'cannot be the same' });
        }
        res.clearCookie('tokenpass');
        return httpResponse.Ok(res, updPass);
    } catch (error) {
        return error
    }
}

const handlePasswordResetLink = (req, res) => {
    const token = req.query.token;
    if (!token) {
        return res.status(400).send('Token inválido');
    }

    // Establecer el token en un cookie con una duración de 1 hora
    res.cookie('tokenpass', token, { httpOnly: true, maxAge: 3600000 }); // 1 hora

    // Redirigir a la página de restablecimiento de contraseña
    res.redirect('/views/recovery_password');
};

const changePremium = async (req, res) => {
    try {
        let userID = req.params.uid
        const changed = await userService.changePremium(userID)
        if(changed) {
            return httpResponse.Ok(res, `Membrecy changed on user: ${changed.email}`)
        } else {
            return httpResponse.NotFound(res, `User not found`)
        }
    } catch (error) {
        return error
    }
}

const uploadDocuments = async (req, res) => {
    try {
        
    } catch (error) {
        console.error('Error en el proceso de carga de archivos:', error.message);
        res.status(500).send('Error en la carga de archivos: ' + error.message);
    }
}

const userController = {
    register,
    login,
    githubLogin,
    logout,
    current,
    updatePass,
    handlePasswordResetLink,
    changePremium,
    uploadDocuments
}

export default userController