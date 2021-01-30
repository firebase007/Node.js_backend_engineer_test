const User = require('../app/user/userModel')
const debug = require('debug')('app:debug')

module.exports = () => {
	seedRuleValidation()
}

const seedRuleValidation = async () => {
	try {
		const userPayload = {
			name: 'Alexander Chinedu Nnakwue',
			github: '@firebase007',
			email: 'alex.nnakwue@gmail.com',
			mobile: '09020327785',
			twitter: '@alex_nnakwue',
		}

		let user = await User.findOne({ email: userPayload.email })

		if (!user) user = await User.create(userPayload)
	} catch (e) {
		debug(e, '--------')
	}
}
