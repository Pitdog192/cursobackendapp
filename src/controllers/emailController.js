import { logger } from "../utils/logger.js"
import emailservice from "../services/emailservice.js"
import userService from "../services/userservice.js"
import { httpResponse } from "../utils/httpResponse.js"


const sendWelcomeMail = async(req, res)=>{
    try {
        const options = emailservice.createMailOptions(req.body.email, 'Bienvenido/a','welcomeEmail', {
            title: 'Welcome!',
            text: 'Este es un correo de bienvenida'
        })
        const response = await emailservice.sendWelcomeMail(options);
        if(response.rejected.length <= 1) logger.info(`Email enviado a : ${response.accepted[0]}`);
        res.redirect('/api/sessions/login')
    } catch (error) {
        logger.error(error);
    }
}

const sendRecoveryMail = async(req, res) => {
    try {
        const email = req.body.email;
        const user = await userService.searchUser(email);
        if (!user) {
            httpResponse.NotFound(res, {msg: 'Correo no encontrado'})
        }
        const token = await userService.generateResetPass(user);
        const options = emailservice.createMailOptions(user.email, 'Recuperación','recoveryPassword', {
            title: 'Correo de recuperación',
            text: 'Ingrese al siguiente enlace para recuperar la contraseña',
            token: token.token
        })
        if (token) {
            const response = await emailservice.sendRecoveryMail(options);
            if(response.rejected.length <= 1) logger.info(`Email enviado a : ${response.accepted[0]}`);
            httpResponse.Ok(res, {msg: 'Correo Enviado'})
        } else httpResponse.NotFound(res, {msg: 'Correo no enviado'})
    } catch (error) {
        console.log(error);
        
        logger.error(error);
    }
}

const emailController = {
    sendWelcomeMail,
    sendRecoveryMail
}

export default emailController