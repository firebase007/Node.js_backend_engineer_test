const path = require('path')
const logger = require('morgan')
const cors = require('cors')

module.exports = (app, express) => {
	app.use(cors())
	app.use(logger('dev'))
	app.use(express.json())
	app.use(express.urlencoded({ extended: false }))
	app.use(express.static(path.join(__dirname, 'public')))
}
