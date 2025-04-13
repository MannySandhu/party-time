import { createLogger, format, transports } from "winston";

const isProd = process.env.NODE_ENV === 'production';

const logger = createLogger({
    level: isProd ? 'info' : 'debug',
    format: format.combine(
        format.timestamp(),
        format.simple()
    ),
    transports: [ 
        new transports.Console(),
        new transports.File({ filename: 'app.log' })
    ]
});

export default logger;