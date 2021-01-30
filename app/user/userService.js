const userRepository = require('./userRepository')

exports.getUserFromDb = async () => new Promise((resolve, reject) => userRepository.findOne({ email: 'alex.nnakwue@gmail.com' })
	.then((response) => resolve(response))
	.catch((error) => reject(error)))
