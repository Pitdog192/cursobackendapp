import express, { urlencoded } from 'express'
import cartRouter from './routes/carts.router.js'
import productRouter from './routes/products.route.js'
import viewsRouter from './routes/views.router.js'
import sessionRouter from './routes/sessionRouter.js'
import handlebars from 'express-handlebars'
import {__dirname} from './utils.js'
import { Server } from 'socket.io'
import productManager from './dao/fileSystem/container/productos.js'
import dbconnection from './db/mongodbcon.js'
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = process.env.PORT || 8080
const app = express()
const httpServer = app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
const socketServer = new Server(httpServer)
if(process.env.PERSISTENCE == 'mongodb') dbconnection()

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/realtimeproducts', viewsRouter)
app.use('/api/sessions', sessionRouter)
app.use(errorHandler);

app.get('*', (req, res) => {
    res.render('index');
})

socketServer.on('connection', async (socket) => {
    console.log(`Cliente conectado`)

    const products = await productManager.getProducts()
    socket.emit('productos', products)
    
    socket.on('newProduct', async (data) => {
        await productManager.addProduct(data)
        socket.emit('productos', products)  
    })
    socket.on('deleteProduct', async (id) => {
        await productManager.deleteProduct(id)
        socket.emit('productos', products)
    })
})