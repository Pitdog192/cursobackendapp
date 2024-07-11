import { connect } from "mongoose"
import { config } from "../config/config.js"

const MONGO_URI = config.MONGO_URI
const dbconnection = async () => {
    try{
        await connect(MONGO_URI)
        console.log('DB connected')
    } catch(err){
        console.log(err)
    }
}

export default dbconnection