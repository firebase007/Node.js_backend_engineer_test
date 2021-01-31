const userRepository = require('./userRepository')
const Response = require('../helper')
const userService = require('./userService')

exports.getUserFromDB = async (req, res) => userService.getUserFromDb()
	.then((response) => Response.sendResponse({
		res, status: 'success', message: 'My Rule-Validation API', responseBody: response,
	})).catch((error) => {
		console.log(error)
		return Response.sendErrorResponse({
			res, status: 'error', message: `Error message ${error}`, statusCode: 500,
		})
	})
