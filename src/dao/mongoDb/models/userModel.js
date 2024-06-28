import mongoose from "mongoose"
const { Schema } = mongoose

const UserSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String},
    email: {type: String, required: true, unique: true},
    age: {type: Number,},
    password: {type: String},
    role: {type: String, default: 'user'},
    cart: {type: String},
    githubUser: {type: Boolean}
})

const userModel = mongoose.model('users', UserSchema)
export default userModel