import mongoose from "mongoose"
const { Schema } = mongoose

const UserSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    age: {type: Number, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'}
})

const userModel = mongoose.model('users', UserSchema)
export default userModel