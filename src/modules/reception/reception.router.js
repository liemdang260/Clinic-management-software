const receptionController = require('../reception/reception.controllers')
const router = require('express').Router()



router.post('/appointment',receptionController.createAppointment)
router.get('/appointment',receptionController.getAllAppointment)
router.put('/appointment/:id',receptionController.updateAppointment)
router.delete('/appointment/:id',receptionController.deleteAppointment)



router.post('/diagnostic/:id',receptionController.createDianosticNew)

module.exports = router