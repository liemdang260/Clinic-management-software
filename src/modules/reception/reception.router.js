const receptionRouter = require('../reception/reception.controllers')
const router = require('express').Router()
router.post('/',receptionRouter.createReception)
router.get('/',receptionRouter.getAllAppointment)
router.put('/:id',receptionRouter.updateAppointment)
router.delete('/:id',receptionRouter.deleteAppointment)
module.exports = router