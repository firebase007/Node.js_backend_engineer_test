const debug = require('debug')('app:debug')

exports.isValidJson = async (str) => {
	console.log(str)
	try {
		JSON.parse(str)
	} catch (e) {
		return false
	}
	return true
}

exports.getNested = async (obj, ...args) => args.reduce((obj, level) => obj && obj[level], obj)