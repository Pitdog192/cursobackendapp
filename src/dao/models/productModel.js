import mongoose from "mongoose"
import { v4 as uuidv4 } from 'uuid'
const { Schema } = mongoose

const productSchema = new Schema({
    pid: {type: String, default: uuidv4, unique: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true},
    price: {type: Number, required: true},
    status: {type: Boolean, default: true},
    stock: {type: Number},
    category: {type: String, required: true},
    thumbnail: {type: String, required: false}
})

const productModel = mongoose.model('products', productSchema)
export default productModel