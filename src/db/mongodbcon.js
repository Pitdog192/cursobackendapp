import { connect } from "mongoose"

const MONGO_URI = process.env.MONGO_URI
const dbconnection = async () => {
    try{
        await connect(MONGO_URI)
        console.log('DB connected')
    } catch(err){
        console.log(err)
    }
}

export default dbconnection