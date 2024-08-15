import winston, { format } from 'winston'
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
        })
    ])
} else if (config.ENVIROMENT == 'development'){
    logConfig = logInfo('debug',  [ 
        new winston.transports.Console({ level: 'debug' })
    ])
}

export const logger = winston.createLogger(logConfig);