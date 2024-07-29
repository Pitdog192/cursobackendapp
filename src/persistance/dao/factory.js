import { config } from '../../config/config.js'
import ConnectMongoDB from '../../db/mongodbcon.js'
import DaoMongoDB from './mongoDb/DaoMongoDb.js'
import productModel from "./mongoDb/models/productModel.js"
import cartModel from "./mongoDb/models/cartModel.js"
import userModel from "./mongoDb/models/userModel.js"

let productDao = null
let cartDao = null
let userDao = null

switch (config.PERSISTENCE2) {
    case 'mongodb':
        const connectMongo = new ConnectMongoDB()
        connectMongo.initMongoDB()  
        productDao = new DaoMongoDB(productModel)
        cartDao = new DaoMongoDB(cartModel)
        userDao = new DaoMongoDB(userModel)
    break;
    default:
        //persistencia por default deberia ser filesystem
    break;
}

export default { userDao, productDao, cartDao };
