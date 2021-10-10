const router = require('express').Router()
const authenticationRouter = require("../modules/authentication/authentication.router")
const userRouter = require('../modules/user/user.router')
router.use('/users',userRouter)
router.get('/',(req,res)=>{
    res.send("APP RUNNING AT PORT 9999")
})
router.use('/login',authenticationRouter)


module.exports = router