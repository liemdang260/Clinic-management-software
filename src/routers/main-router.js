const router = require('express').Router()
const authenticationRouter = require("../modules/authentication/authentication.router")
const managerRouter = require('../modules/manager/manager.router')
const userRouter = require('../modules/user/user.router')

const {isAuth} = require('../modules/authentication/authentication.middlewares')
const {isManager} = require('../modules/manager/manager.middlewares')

router.use((req,res,next)=>{
    console.log(req.method,req.url)
    return next();
})

router.use('/users',userRouter)
router.get('/',(req,res)=>{
    res.send("APP RUNNING AT PORT 9999")
})
router.use('/login',authenticationRouter)

router.use('/manager',isAuth, isManager,managerRouter)

module.exports = router