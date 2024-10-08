import { describe, test, before } from "node:test";
import assert from "node:assert";
import { logger } from "../utils/logger.js";
import {generateProduct, generateUser} from "../utils/mock.js";

const apiProductsURL = "http://localhost:8080/api/products";
const apiCartsURL = "http://localhost:8080/api/carts";
const apiSessionsURL = "http://localhost:8080/api/sessions";
let cartID
let userfake

describe('Test api ecommerce', ()=>{
    before(async () => {
        let response = await fetch(apiProductsURL, { method: 'DELETE' })
        logger.info("se limpio la base de datos");
    });

    test('[GET] /products', async ()=>{
        const response = await fetch(`${apiProductsURL}/getProdsApi`);
        const responseJson = await response.json();
        assert.strictEqual(Array.isArray(responseJson), true);
        assert.equal(responseJson.length, 0);
    })

    test('[POST] /products', async()=>{
        const body = generateProduct();
        const response = await fetch(apiProductsURL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const responseJson = await response.json();
        assert.ok(responseJson.data._id, '_id');
        assert.equal(body.title, responseJson.data.title);
        assert.equal(response.status, 200)
    })

    test('[POST] /carts', async()=>{
        const response = await fetch(apiCartsURL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" }
        });
        const responseJson = await response.json();
        cartID = responseJson.data
        assert.strictEqual(typeof responseJson.data, 'string')
        assert.equal(response.status, 200)
    })

    test('[GET] /carts', async()=>{
        const response = await fetch(`${apiCartsURL}/${cartID}`);
        const responseJson = await response.json();
        assert.strictEqual(Array.isArray(responseJson.data), true);
        assert.equal(response.status, 200)
        assert.equal(responseJson.message, 'Success');
    })

    test('[POST] /sessions', async()=>{
        const user = generateUser()
        userfake = {
            email: user.email,
            password: user.password
        }
        const response = await fetch(`${apiSessionsURL}/register`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        assert.equal(response.status, 200)
    })

    test('[POST] /sessions', async()=>{
        const response = await fetch(`${apiSessionsURL}/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userfake)
        });
        assert.equal(response.status, 200)
    })
})