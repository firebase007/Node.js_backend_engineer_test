module.exports = {
	sendResponse({
		res, statusCode = 200, message = 'success', responseBody,
	}) {
		 res.status(statusCode).send({
			data: responseBody,
			status: 'success',
			message,
		})
	},

	sendErrorResponse({
		res, statusCode = 500, message = 'error', responseBody,
	}) {
		 res.status(statusCode).send({
			data: responseBody,
			status: 'error',
			message,
		})
	},

}
