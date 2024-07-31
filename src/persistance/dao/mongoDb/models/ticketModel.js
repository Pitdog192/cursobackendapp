import mongoose from "mongoose";
const { Schema } = mongoose

const ticketSchema = new Schema({
    code: { type: String, required: true },
    purchase_datetime: { type: String, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
})

const ticketModel = mongoose.model('ticket', ticketSchema)
export default ticketModel