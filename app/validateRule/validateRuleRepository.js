const Repository = require('../Repository')
const validateRuleModel = require('./validateRuleModel')

class ValidateRuleRepository extends Repository {
	constructor() {
		super(validateRuleModel)
	}
}

module.exports = (new ValidateRuleRepository())
