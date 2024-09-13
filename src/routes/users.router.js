import { Router } from "express"
import userController from "../controllers/userController.js"
import { checkAuth } from "../middlewares/jwt.js"
import { uploader } from "../utils/utils.js"

const usersRouter = Router()

usersRouter.get('/premium/:uid', checkAuth, userController.changePremium)
usersRouter.post('/:uid/documents', uploader.single('file'), checkAuth, userController.uploadDocuments)

export default usersRouter