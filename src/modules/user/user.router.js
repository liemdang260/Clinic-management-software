
const router = require('express').Router()
const userController = require('../user/user.controllers')
const authMiddleware = require('../authentication/authentication.middlewares')



router.get('/profile', authMiddleware.isAuth, userController.getProfileById)
router.put('/profile', userController.updateProfileById)
router.put('/password', userController.changPassword)

router.get('/medical-examination-fee', userController.getAllService)

router.get('/doctor', userController.getAllDoctor)
//quên mật khẩu

module.exports = router


