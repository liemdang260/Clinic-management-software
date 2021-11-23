const doctorControllers = require('../doctor/doctor.controllers')
const router = require('express').Router()



router.put('/diagnostic/:id',doctorControllers.updateDiagnosticDT)
module.exports = router