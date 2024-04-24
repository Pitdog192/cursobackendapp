import express, { urlencoded } from 'express'
import productManager from './container/productos.js'

const PORT = 8080
const app = express()
app.use(express.json())
app.use(urlencoded({extended: true}))

app.get('/products', async (req, res)=>{
    try{
        let {limit} = req.query
        let allProducts = await productManager.getProducts(limit)
        res.send(allProducts)
    } catch (error){
        res.status(500).send('Error al obtener productos')
    }
})

app.get('/products/:pid', async (req, res)=>{
    let productId = req.params.pid
    try {
        let product = await productManager.getProductById(productId)
        res.send(product)
    } catch (error) {
        res.status(500).send('Error al obtener el producto')
    }
})

app.listen(PORT, () => console.log(`Server listening on port :${PORT}`))