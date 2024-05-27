import mongoose from "mongoose";
const { Schema } = mongoose

const messageSchema = new Schema({
    user: {type: String, required: true},
    message: {type: String, required: true}
})

const messageModel = mongoose.Schema('messages', messageSchema)
export default messageModel