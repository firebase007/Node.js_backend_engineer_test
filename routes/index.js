const validateRuleRouter = require('./validateRule')
const user = require('./user')

module.exports = (app) => {
	app.use(user)
	app.use(validateRuleRouter)
}
