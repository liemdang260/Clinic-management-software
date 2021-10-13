const router = require('express').Router()
const userController = require('./user.controllers')
const authMiddleware = require('../authentication/authentication.middlewares')
router.get('/profile',authMiddleware.isAuth,userController.getUserById)
module.exports = router