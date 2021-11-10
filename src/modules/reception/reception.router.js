const appointmentRouter = require('../reception/reception.controllers')
const router = require('express').Router()
router.post('/',appointmentRouter.createAppointment)
router.get('/',appointmentRouter.getAllAppointment)
router.put('/:id',appointmentRouter.updateAppointment)
router.delete('/:id',appointmentRouter.deleteAppointment)
module.exports = router