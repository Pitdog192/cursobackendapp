import {createTransport} from 'nodemailer'
import { config } from '../config/config.js';
import path from 'path';
import hbs from 'nodemailer-express-handlebars'
import { logger } from '../utils/logger.js';

export const transporter = createTransport({
    service: 'gmail',
    port: config.EMAIL_PORT,
    secure: true,
    auth: {
        user: config.EMAIL,
        pass: config.EMAIL_PASSWORD
    }
});

const handlebarsOptions = {
    viewEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve('./src/views/emails'),
        defaultLayout: false
    },
    viewPath: path.resolve('./src/views/emails'),
    extName: '.handlebars'
}

transporter.use('compile', hbs(handlebarsOptions))

/**
 * 
 * @param {*} dest // A donde se envia el correo
 * @param {*} sub // Asunto del correo
 * @param {*} temp //El template que se usa para enviar el correo
 * @param {*} context // Variables que se envian en el template
 * @returns 
 */
const createMailOptions = (dest, sub ,temp, context) => {
    return {
        from: config.EMAIL,
        to: dest,
        subject: sub,
        template: temp,
        context: context
    }
}

/**
 * 
 * @param {*} options // objeto que llega desde la funcion createMailOptions
 * @returns 
 */
const sendWelcomeMail = async(options)=>{
    try {
        const response = await transporter.sendMail(options);
        return response
    } catch (error) {
        throw new Error
    }
}

const sendRecoveryMail = async(options) => {
    try {
        const response = await transporter.sendMail(options);
        return response
    } catch (error) {
        throw new Error
    }
}

const emailservice = {
    createMailOptions,
    sendWelcomeMail,
    sendRecoveryMail
}

export default emailservice