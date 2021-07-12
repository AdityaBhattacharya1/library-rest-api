const log4js = require('log4js')
const logger = log4js.getLogger('Output')
logger.level = process.env.NODE_ENV === 'production' ? 'info' : 'debug'

module.exports = logger
