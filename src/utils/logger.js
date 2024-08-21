import winston, { format } from 'winston'
import 'winston-mongodb';
import { config } from '../config/config.js'
const { combine, colorize, printf, timestamp } = format

let logConfig

const logInfo = (loglevel, logtransport) =>{
    return {
        level: loglevel,
        format: combine(
            timestamp({
                format: 'DD-MM-YYYY HH:mm'
            }),
            colorize(),
            printf((log) => `${log.timestamp} - ${log.level}: ${log.message}`)
        ),
        transports: logtransport
    }
}

if(config.ENVIROMENT == 'productive'){
    logConfig = logInfo('info', [ 
        new winston.transports.Console(),
        new winston.transports.File({ 
            filename: './logs/errors.log',
            level: 'error',
            format: format.uncolorize()
        }),
        winston.add(new winston.transports.MongoDB({
            options: { useUnifiedTopology: true },
            db: config.MONGO_URI,
            collection: 'logs',
            tryReconnect: true,
            level: 'error'
        }))
    ])
} else if (config.ENVIROMENT == 'development'){
    logConfig = logInfo('debug',  [ 
        new winston.transports.Console({ level: 'debug' }),
        new winston.transports.File({ 
            filename: './logs/errors.log',
            level: 'error',
            format: format.uncolorize()
        }),
    ])
}

export const logger = winston.createLogger(logConfig);