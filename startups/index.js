module.exports = (app, express) => {
	// logger
	require('./logging')

	// middleware
	require('./middleware')(app, express)

	// database connection
	require('./database')

	// seeder
	require('./seeder')()
}
