const winston = require('winston');
const split = require('split');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    })
  ],
  exitOnError: false
});

/**
 * Avoid logger in production
 */
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.align(),
      winston.format.printf(info => `${ info.timestamp } ${ info.level }: ${ info.message }`)
    ),
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }));
};

module.exports = logger;

/**
 * stream to use for morgan - using split to remove the last \n added by morgan
 */
module.exports.stream = split().on('data', function (line) {
  logger.info(line)
});
