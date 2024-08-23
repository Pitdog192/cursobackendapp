import { Router } from "express"
import emailController from '../controllers/emailController.js';
import { checkAuth } from "../middlewares/jwt.js";

const emailRouter = Router();

emailRouter.post('/send' ,emailController.sendWelcomeMail);
emailRouter.post('/recoverypassword', emailController.sendRecoveryMail);

export default emailRouter