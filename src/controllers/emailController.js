import { logger } from "../utils/logger.js"
import {transporter} from '../services/emailservice.js'
import { config } from "../config/config.js"
import emailservice from "../services/emailservice.js"


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
        const options = emailservice.createMailOptions(req.body.email, 'Recuperación','recoveryPassword', {
            title: 'Correo de recuperación',
            text: 'Ingrese al siguiente enlace para recuperar la contraseña'
        })
        const response = await emailservice.sendRecoveryMail(options);
        if(response.rejected.length <= 1) logger.info(`Email enviado a : ${response.accepted[0]}`);
        res.redirect('/api/sessions/login')
    } catch (error) {
        logger.error(error);
    }
}

const emailController = {
    sendWelcomeMail,
    sendRecoveryMail
}

export default emailController