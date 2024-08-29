import { __dirname } from "../src/utils/utils.js"
export const info = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Compras",
            version: "1.0.0",
            description: "Documentacion de API compras",
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
            // {
            //     url: "url"
            // }
        ],
    },
    apis: [`${__dirname}/../../docs/**/*.yml`],
}