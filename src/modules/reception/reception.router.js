const receptionController = require('../reception/reception.controllers')
const router = require('express').Router()
router.post('/',receptionController.createAppointment)
router.get('/',receptionController.getAllAppointment)
router.put('/:id',receptionController.updateAppointment)
router.delete('/:id',receptionController.deleteAppointment)
module.exports = router