import {fileURLToPath} from 'url'
import { dirname } from 'path'
import multer from 'multer'
import bcryptjs from "bcryptjs";
import { faker } from '@faker-js/faker';

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


//MOCK
const generateProduct = () => {
    return {
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.commerce.isbn(),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        stock: faker.number.int({ min: 1, max: 100 }),
        category: faker.commerce.productAdjective(),
        thumbnail: faker.image.avatar()
    }
}

export {__dirname, uploader, createHash, isValidPassword, generateProduct}