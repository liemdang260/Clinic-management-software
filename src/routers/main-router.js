const router = require('express').Router()
const userRouter = require('../modules/user/user.router')
router.use('/users',userRouter)
router.get('/',(req,res)=>{
    res.send("APP RUNNING AT PORT 9999")
})


module.exports = router