import mongoose from "mongoose"
import { v4 as uuidv4 } from 'uuid'
const { Schema } = mongoose

const cartSchema = new Schema({
    cid: {type: String, default: uuidv4, unique: true},
    products: [
        {
            _id: false,
            quantity: {
                type: Number,
                default: 1 
            },
            pid: {
                type: Schema.Types.ObjectId,
                ref: "products" // Referencia al modelo de productos
            }
        }
    ]
})

const cartModel = mongoose.model('carts', cartSchema)
export default cartModel