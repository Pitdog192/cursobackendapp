import { Router } from "express"
import userController from "../controllers/userController.js"
import passport from "passport";
import { checkAuth } from "../middlewares/jwt.js";
import { validatorRegister } from "../middlewares/validator/user.validator.js";

const sessionRouter = Router()

//ESTRATEGIA LOCAL
sessionRouter.post('/register', [validatorRegister], passport.authenticate('register', {
    successRedirect: '/views/login',
    failureRedirect: '/register',
    failureFlash: true
}), userController.register)
sessionRouter.post('/login', passport.authenticate('login'), userController.login)

//ESTRATEGIA DE GITHUB
sessionRouter.get('/githubestra', passport.authenticate('github', { scope: [ 'user:email' ] }))  
sessionRouter.get('/githubprofile', passport.authenticate( 'github'), userController.githubLogin);

sessionRouter.post('/logout', userController.logout)

sessionRouter.get('/current', checkAuth, userController.current)

export default sessionRouter
