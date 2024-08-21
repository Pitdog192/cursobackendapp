import { logger } from "../utils/logger.js"
import {transporter} from '../services/emailservice.js'
import { config } from "../config/config.js"

const sendWelcomeMail = async(req, res)=>{
    try {
        const mailOptions = {
            from: config.EMAIL,
            to: req.body.email,
            subject: 'Bienvenido/a',
            template: 'welcomeEmail',
            context: {
                title: 'Welcome!',
                text: 'Este es un correo de bienvenida'
            }
        }
        const response = await transporter.sendMail(mailOptions); //LA VARIABLE MAILOPTIONS SE PUEDE DEFINIR ACA PARA PASARLE PARAMETROS CON REQ 
        logger.info('email enviado!');
        res.json(response)
    } catch (error) {
        logger.error(error);
    }
}

const emailController = {
    sendWelcomeMail
}
export default emailController