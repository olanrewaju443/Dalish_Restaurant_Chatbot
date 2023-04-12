const {createLogger, format, transports } = require("winston");

const logger = createLogger({
    level: 'info',
    defaultMeta: { service: 'user-service'},
    transports: [
        new transports.Console()
        //new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
        //new winston.transports.File({ filename: './logs/combined.log' }),
    ],
    format: format.combine(
        format.timestamp(),
        format.json()
    )
});

module.exports = logger