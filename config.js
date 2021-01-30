/* eslint-disable no-tabs */

require('dotenv').config()

const { env } = process

module.exports = {
	name: env.APP_NAME,
	mongo: {
		salt_value: 10,
	},
	baseUrl: env.APP_BASE_URL,
	appName: env.APP_NAME,
	port: env.PORT,
	databases: {
		mongodb: {
			user: env.MONGODB_USER,
			password: env.MONGODB_PASSWORD,
			host: env.MONGODB_HOST,
			port: env.MONGODB_PORT,
			db_name: env.MONGODB_DATABASE_NAME,
			url: env.MONGODB_LOCAL_URL,
		},
	},

}
