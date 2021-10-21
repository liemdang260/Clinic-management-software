const managerRouter = require('../manager/manager.controllers')
const router = require('express').Router()
router.get('/employees',managerRouter.getEMPLOYEE)
router.delete('/employees/:id',managerRouter.deleteEmployee)
module.exports = router