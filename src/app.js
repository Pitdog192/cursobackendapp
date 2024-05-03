import express, { urlencoded } from 'express'
import cartRouter from './routes/carts.router.js'
import productRouter from './routes/products.route.js'
import handlebars from 'express-handlebars'
import __dirname from './dirname.js'

const PORT = 8080
const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))