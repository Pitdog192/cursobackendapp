import { connect } from "mongoose";
import { config } from "../config/config.js";

const MONGO_URI = config.MONGO_URI;
class ConnectMongoDB {
    static #instance;
    constructor() {
        //OPCION1
        // connect(process.env.MONGO_ATLAS_URL || process.env.MONGO_LOCAL_URL)
        //   .then(()=>console.log('Conectado a MongoDB'))
        //   .catch((error)=>console.log(error))
    }

    async initMongoDB() {
        try {
            await connect(MONGO_URI);
            console.log("Mongo DB connected");
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getInstance() {
        if (this.#instance) {
            console.log("Mongo DB connected");
            return this.#instance;
        } else {
            this.#instance = await this.initMongoDB(); //OPCION2
            // this.#instance = new ConnectMongoDB();     //OPCION1
            // console.log("Conectado a MongoDB!");
            return this.#instance;
        }
    }
}

export default ConnectMongoDB
