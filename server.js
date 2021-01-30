require('dotenv').config()
const createError = require('http-errors')
const express = require('express')

const app = express()
const config = require('./config')
const debug = require('debug')('app:debug')
const Response = require('./app/helper')

require('express-async-errors')

require('./startups')(app, express)

// routes
require('./routes')(app)

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
	console.error(err.message, (new Error(err)).stack, {
		status: err.status,
		url: req.url,
	})
	if (err.message.includes('Unexpected')) {
		return Response.sendErrorResponse({
			res, status: 'error', message: 'Invalid JSON payload passed.', statusCode: 400, responseBody: null,
		})
	}
	debug('Error', { err })
	res.status(err.status || 500)
	res.send({ error: err.message })
})

app.listen(process.env.PORT || config.port, () => {
	console.log(`${config.appName} listening on port ${config.port}!`)
})

module.exports = app
