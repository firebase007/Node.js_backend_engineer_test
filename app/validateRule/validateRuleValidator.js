const Joi = require('@hapi/joi')
const debug = require('debug')('app:debug')
const Response = require('../helper')
// const validateRuleRepository = require("./validateRuleRepository");

exports.validateRule = async (req, res, next) => {
	const schema = Joi.object().keys({
		field: Joi.string().required(),
		condition: Joi.string().required(),
		condition_value: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
	})

	const result = Joi.validate(req.body.rule, schema, {
		allowUnknown: true,
		abortEarly: true,
	})

	console.log(result, '------------')

	// if(result.error.details[0].message.replace(/['"]/g, '') === "value must be an object") {
	//     return Response.sendErrorResponse({res, status: "error", message: `${rule} should be a|an ${object}.`, statuscode: 422,responseBody: null});
	// }

	if (result.error) return Response.sendErrorResponse({ res, message: result.error.details[0].message.replace(/['"]/g, ''), statuscode: 422 })
}
