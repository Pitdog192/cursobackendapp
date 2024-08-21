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