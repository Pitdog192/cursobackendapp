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
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import './middlewares/passport/passportLocal.js'
import './middlewares/passport/passportGithub.js'

const PORT = process.env.PORT || 8080
const app = express()
const httpServer = app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
const socketServer = new Server(httpServer)
if(process.env.PERSISTENCE === "mongodb") dbconnection()

export const ENV_KEYS = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    PERSISTENCE: process.env.PERSISTENCE,
    SECRET: process.env.SECRET,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CALLBACK_URL: process.env.CALLBACK_URL,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
}
    
const storeConfig = {
    store: MongoStore.create({
        mongoUrl: ENV_KEYS.MONGO_URI,
        crypto: { secret: ENV_KEYS.SECRET },
        ttl: 180,
    }),
    secret: ENV_KEYS.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180000 }
}

export const generateToken = (user, time = "5m") => {
    const payload = {userId: user._id}
    return jwt.sign(payload, ENV_KEYS.SECRET, { expiresIn: time,})
}

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))
app.use(errorHandler)
app.use(cookieParser())
app.use(session(storeConfig))
//PASSPORT
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/views', viewsRouter)
app.use('/api/sessions', sessionRouter)

app.get('*', (req, res) => {
    res.redirect('/views/login');
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