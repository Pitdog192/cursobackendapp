import { connect } from "mongoose";
import { config } from "../config/config.js";

const MONGO_URI = config.MONGO_URI;
class ConnectMongoDB {
    static #instance
    constructor() {
    }

    async initMongoDB() {
        try {
            await connect(MONGO_URI);
            console.log("Mongo DB connected")
        } catch (error) {
            throw new Error(error)
        }
    }

    static async getInstance() {
        if (this.#instance) {
            console.log("Mongo DB connected")
            return this.#instance
        } else {
            this.#instance = await this.initMongoDB()
            return this.#instance
        }
    }
}

export default ConnectMongoDB
