const logger = require('../config/logger')

function logToConsole(string) {
	process.env.NODE_ENV === 'production'
		? logger.info(string)
		: logger.debug(string)
}

module.exports.logToConsole = logToConsole
