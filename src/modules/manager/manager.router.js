const managerController = require('../manager/manager.controllers')
const router = require('express').Router()



router.post('/employees', managerController.createEmployee)
router.get('/employees', managerController.getAllEmployee)
router.get('/employees/:id', managerController.getEmployeeById) 
router.put('/employees/:id', managerController.updateEmployee)
router.delete('/employees/:id', managerController.deleteEmployee)



router.put('/medical-examination-fee', managerController.changeMedicalExaminationFee)



module.exports = router