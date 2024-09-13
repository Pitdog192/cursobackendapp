import mongoose from "mongoose"
const { Schema } = mongoose

const UserSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String},
    email: {type: String, required: true, unique: true},
    age: {type: Number,},
    password: {type: String},
    role: {type: String, default: 'user'},
    githubUser: {type: Boolean},
    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts",
        default: []
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    documents: [{
        name: { type: String },
        link: { type: String }
    }],
    last_connection: { type: String}
})

const userModel = mongoose.model('users', UserSchema)
export default userModel