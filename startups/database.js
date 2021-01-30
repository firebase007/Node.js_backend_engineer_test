const mongoose = require('mongoose')
// console.log(config.get("MONGODB_URL"));
mongoose.set('debug', true)
// const mongodbUrl = `${process.env.MONGODB_URL}/rule_validation_db_${process.env.NODE_ENV}?retryWrites=true`;
// console.log("MONGO_DB_FULL_URL", mongodbUrl);
const mongodbUrl = process.env.DATABASE

console.log('MONGO_DB_FULL_URL', mongodbUrl)
mongoose.connect(mongodbUrl, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
})
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('connected', () => {
	console.log('Mongodb connected')
})

db.on('error', (error) => {
	console.error('An error occurred', JSON.stringify(error))
	logger(error.message, new Error(error.message), { mongodbUrl }, true)
	process.exit(0)
})

process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		console.log('Mongoose disconnected on app termination')
		process.exit(0)
	})
})
