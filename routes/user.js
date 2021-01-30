const express = require('express')

const router = express.Router()

// get controller
const userController = require('../app/user/userController')

router.get('/', userController.getUserFromDB)

module.exports = router
