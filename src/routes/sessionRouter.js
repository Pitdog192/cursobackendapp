import { Router } from "express"
import userController from "../controllers/userController.js"

const sessionRouter = Router()

sessionRouter.post('/register', userController.register)
sessionRouter.post('/login', userController.login)
sessionRouter.post('/logout', userController.logout)

export default sessionRouter
