const customerController = require('./customer.controller')
const router = require('express').Router()

router.post('/appointment-request', customerController.createAppointmentRequest)

module.exports = router