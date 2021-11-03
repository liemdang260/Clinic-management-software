const managerController = require('../manager/manager.controllers')
const router = require('express').Router()
router.get('/employees', managerController.getEMPLOYEE)
router.delete('/employees/:id', managerController.deleteEmployee)
router.put('/medical-examination-fee', managerController.changeMedicalExaminationFee)
module.exports = router