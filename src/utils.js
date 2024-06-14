import {fileURLToPath} from 'url'
import { dirname } from 'path'
import multer from 'multer'
import bcryptjs from "bcryptjs";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, __dirname+'/public/images')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const uploader = multer({storage})


//HASH password
const createHash = (password) => bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))
const isValidPassword = (password, user) => bcryptjs.compareSync(password, user.password);

export {__dirname, uploader, createHash, isValidPassword}