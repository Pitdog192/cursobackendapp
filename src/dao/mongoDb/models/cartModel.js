import mongoose from "mongoose"
import { v4 as uuidv4 } from 'uuid'
const { Schema } = mongoose

const cartSchema = new Schema({
    cid: {type: String, default: uuidv4, unique: true},
    products: [
        {
            pid: { type: Schema.Types.ObjectId, required: true },
            quantity: { type: Number, required: true, default: 1 },
            _id: false
        }
    ]
})

const cartModel = mongoose.model('carts', cartSchema)
export default cartModel