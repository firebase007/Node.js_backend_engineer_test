const Repository = require('../Repository')
const userModel = require('./userModel')

class userRepository extends Repository {
	constructor() {
		super(userModel)
	}
}

module.exports = (new userRepository())
