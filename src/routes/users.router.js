import { Router } from "express"
import userController from "../controllers/userController.js"
import { checkAuth } from "../middlewares/jwt.js"
import { uploader } from "../utils/utils.js"

const usersRouter = Router()

usersRouter.get('/', checkAuth, userController.getAllUsers)
usersRouter.delete('/', checkAuth, userController.deleteAllUsers)
usersRouter.post('/premium/:uid', checkAuth, userController.changePremium)
usersRouter.post('/:uid/images', uploader('images').single('file'), checkAuth, userController.uploadDocuments)
usersRouter.post('/:uid/documents', uploader('documents').single('file'), checkAuth, userController.uploadDocuments)
usersRouter.post('/:uid/profiles', uploader('profiles').single('file'), checkAuth, userController.uploadDocuments)

export default usersRouter