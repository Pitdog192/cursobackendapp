import { describe, test, before } from "node:test";
import assert from "node:assert";
import { logger } from "../utils/logger.js";
import generateProduct from "../utils/mock.js";

const apiURL = "http://localhost:8080/api/products";

describe('Test api ecommerce', ()=>{
    before(async () => {
        let response = await fetch(apiURL, { method: 'DELETE' })
        logger.info("se limpio la base de datos");
    });

    test('[GET] /products', async ()=>{
        const response = await fetch(`${apiURL}/getProdsApi`);
        const responseJson = await response.json();
        assert.strictEqual(Array.isArray(responseJson), true);
        assert.equal(responseJson.length, 0);
    })

    test('[POST] /products', async()=>{
        const body = generateProduct();
        console.log(body);
        
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const responseJson = await response.json();
    
        assert.ok(responseJson.data._id, '_id');
        assert.equal(body.title, responseJson.data.title);
        assert.equal(response.status, 200)
    })
})