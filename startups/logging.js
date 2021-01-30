const debug = require('debug')('app:debug')

const logger = (error, stack, additionalMessage, isCritical = false) => {
	debug(error, stack, additionalMessage, isCritical)
	if (process.env.NODE_ENV != 'development') {
		if (isCritical) {
			console.log(error, stack, additionalMessage, new Date())
		} else {
			console.log(error)
		}
	}
}

process.on('uncaughtException', (ex) => {
	logger(ex.message, ex.stack, {
		error: ex.toString(),
	})
	process.exit(0)
})

process.on('uncaughtRejection', (ex) => {
	logger(ex.message, new Error(ex).stack, {
		error: ex.toString(),
	})
	process.exit(0)
})

process.on('unhandledRejection', (ex) => {
	debug(ex)
	logger(ex.message, new Error(ex).stack, {
		error: ex.toString(),
	})
	process.exit(0)
})

global.logger = logger
