const receptionController = require('../reception/reception.controllers')
const authMiddleware = require('../authentication/authentication.middlewares')
const router = require('express').Router()



router.post('/appointment', receptionController.createAppointment)
router.get('/appointment', receptionController.getAllAppointment)
router.get('/appointment/:id', receptionController.getAppointmentById)
router.get('/appointment-by-week', receptionController.getAppointmentByWeek)
// router.get('/appointment',receptionController.getAppointmentInDay) 
router.put('/appointment/:id', receptionController.updateAppointment)
router.delete('/appointment/:id', receptionController.deleteAppointment)



router.post('/patient', receptionController.createPatient)
router.get('/patient', authMiddleware.isAuth, receptionController.getAllPatient)
router.get('/patient/:id', receptionController.getPatientById)
router.put('/patient/:id', receptionController.updatePatient)
router.delete('/patient/:id', receptionController.deletePatient)



router.post('/diagnostic', receptionController.createDiagnostic)
router.get('/diagnostic', receptionController.getAllDiagnostic)
router.get('/diagnostic/:id', receptionController.getDiagnosticById)
router.put('/diagnostic/:id', receptionController.updateDiagnostic)
router.delete('/diagnostic/:id', receptionController.deleteDiagnostic)



module.exports = router

