const doctorControllers = require('../doctor/doctor.controllers')
const router = require('express').Router()


router.get('/room', doctorControllers.getRoom)
router.put('/diagnostic/', doctorControllers.updateDiagnosticDT)
module.exports = router