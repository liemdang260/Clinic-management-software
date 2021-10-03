const router = require('express').Router()
const userController = require('./user.controllers')

router.get('/',userController.getAllUser)

module.exports = router