import express, { urlencoded } from 'express'
import cartRouter from './routes/carts.router.js'
import productRouter from './routes/products.route.js'

const PORT = 8080
const app = express()
app.use(express.json())
app.use(urlencoded({extended: true}))

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))