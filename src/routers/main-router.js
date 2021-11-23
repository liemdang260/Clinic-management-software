const router = require('express').Router()
const authenticationRouter = require("../modules/authentication/authentication.router")
const managerRouter = require('../modules/manager/manager.router')
const receptionRouter = require('../modules/reception/reception.router')
const doctorRouter = require('../modules/doctor/doctor.router')
const userRouter = require('../modules/user/user.router')
const customerRouter = require('../modules/customer/customer.router')


const {isAuth} = require('../modules/authentication/authentication.middlewares')
const {isManager} = require('../modules/manager/manager.middlewares')
const {isDoctor} = require('../modules/doctor/doctor.middlewares')




router.use((req, res, next) => {
    console.log(req.method, req.url)
    return next();
})

router.get('/', (req, res) => {
    res.send(`APP IS RUNNING ON ${process.env.PORT}`)
})

router.get('/favicon.ico', () => {})


router.use(isAuth)
router.use('/user',userRouter)

router.use('/doctor',isDoctor,doctorRouter)
router.use('/manager', isManager,managerRouter)
router.use('/reception',receptionRouter)



router.use('/login', authenticationRouter)
router.use('/customer', customerRouter)

router.use(isAuth)


router.use('/user',userRouter)
router.use('/doctor',isDoctor,doctorRouter)
router.use('/manager', isManager,managerRouter)
router.use('/reception',receptionRouter)

module.exports = router