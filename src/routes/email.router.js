import { Router } from "express"
import emailController from '../controllers/emailController.js';

const emailRouter = Router();

emailRouter.post('/send', emailController.sendWelcomeMail);

export default emailRouter