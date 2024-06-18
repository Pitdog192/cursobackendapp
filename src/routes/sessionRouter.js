import { Router } from "express"
import userController from "../controllers/userController.js"
import passport from "passport";

const sessionRouter = Router()

sessionRouter.post('/register', passport.authenticate('register', {
    successRedirect: '/views/profile',
    failureRedirect: '/register',
    failureFlash: true
}), userController.register)
sessionRouter.post('/login', passport.authenticate('login'), userController.login)
sessionRouter.post('/logout', userController.logout)

export default sessionRouter
