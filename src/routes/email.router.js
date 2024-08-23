import { Router } from "express"
import emailController from '../controllers/emailController.js';

const emailRouter = Router();

emailRouter.post('/send', emailController.sendWelcomeMail);
emailRouter.post('/recoverypassword', emailController.sendRecoveryMail);

export default emailRouter