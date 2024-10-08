import express, { urlencoded } from 'express'
import cartRouter from './routes/carts.router.js'
import productRouter from './routes/products.route.js'
import viewsRouter from './routes/views.router.js'
import sessionRouter from './routes/sessionRouter.js'
import emailRouter from './routes/email.router.js'
import usersRouter from './routes/users.router.js'
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
import compression from 'compression';
import { logger } from './utils/logger.js'
import helmet from 'helmet'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { info } from '../docs/info.js'

const PORT = config.PORT || 8080
const app = express()
const httpServer = app.listen(PORT, () => logger.info(`Server listening on port: ${PORT}`))
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

app.engine('handlebars', handlebars.engine())
.set('views', __dirname+'/../views')
.set('view engine', 'handlebars')
.use(helmet())
.use(express.json())
.use(urlencoded({extended: true}))
.use(express.static(__dirname + '/../public'))
.use(errorHandler)
.use(cookieParser())
.use(compression())
.use(session(storeConfig))
.use(cors({origin: config.FRONT_ORIGIN}))
.use(flash())
.use(passport.initialize())
.use(passport.session())
.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(info)))
.use('/api/products', productRouter)
.use('/api/carts', cartRouter)
.use('/api/users', usersRouter)
.use('/api/sessions', sessionRouter)
.use('/views', viewsRouter)
.use('/email', emailRouter)
.disable('x-powered-by');

app.get('/loggerTest', (req, res) =>{
    logger.debug('Simulandolog debug') // en prod no deberia salir
    logger.http('Simulandolog http') // en prod no deberia salir
    logger.info('Simulandolog info')
    logger.warn('Simulandolog warn')
    logger.error('Simulando log error en prod')
})

app.get('*', (req, res) => {
    res.redirect('/views/login');
})

socketServer.on('connection', async (socket) => {
    logger.info(`Cliente conectado`)

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