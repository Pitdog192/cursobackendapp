import { Router } from "express"
import userController from "../controllers/userController.js"
import passport from "passport";

const sessionRouter = Router()

//ESTRATEGIA LOCAL
sessionRouter.post('/register', passport.authenticate('register', {
    successRedirect: '/views/login',
    failureRedirect: '/register',
    failureFlash: true
}), userController.register)
sessionRouter.post('/login', passport.authenticate('login'), userController.login)

//ESTRATEGIA DE GITHUB
sessionRouter.get('/githubestra', passport.authenticate('github', { scope: [ 'user:email' ] }))  
sessionRouter.get('/githubprofile', passport.authenticate( 'github'), userController.githubLogin);

sessionRouter.post('/logout', userController.logout)

sessionRouter.get('/current', )

export default sessionRouter
