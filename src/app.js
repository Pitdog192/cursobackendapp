import express, { urlencoded } from 'express'
import cartRouter from './routes/carts.router.js'
import productRouter from './routes/products.route.js'
import viewsRouter from './routes/views.router.js'
import sessionRouter from './routes/sessionRouter.js'
import handlebars from 'express-handlebars'
import {__dirname} from './utils/utils.js'
import { Server } from 'socket.io'
import productManager from './persistance/dao/fileSystem/container/productos.js'
import { errorHandler } from './middlewares/errorHandler.js';
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import cors from 'cors';
import './middlewares/passport/passportLocal.js'
import './middlewares/passport/passportGithub.js'
import { config } from './config/config.js'
import flash from 'connect-flash'

const PORT = config.PORT || 8080
const app = express()
const httpServer = app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
const socketServer = new Server(httpServer)

const storeConfig = {
    store: MongoStore.create({
        mongoUrl: config.MONGO_URI,
        crypto: { secret: config.SECRET },
        ttl: 180,
    }),
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180000 }
}

export const generateToken = (user, time = "5m") => {
    const payload = {userId: user._id}
    return jwt.sign(payload, ENV_KEYS.SECRET, { expiresIn: time,})
}

app.engine('handlebars', handlebars.engine())
.set('views', __dirname+'/../views')
.set('view engine', 'handlebars')
.use(express.json())
.use(urlencoded({extended: true}))
.use(express.static(__dirname + '/../public'))
.use(errorHandler)
.use(cookieParser())
.use(session(storeConfig))
.use(cors({origin: config.FRONT_ORIGIN}))
.use(flash())
.use(passport.initialize())
.use(passport.session())
.use('/api/products', productRouter)
.use('/api/carts', cartRouter)
.use('/views', viewsRouter)
.use('/api/sessions', sessionRouter)

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