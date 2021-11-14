const receptionController = require('../reception/reception.controllers')
const authMiddleware = require('../authentication/authentication.middlewares')
const router = require('express').Router()



router.post('/appointment', receptionController.createAppointment)
router.get('/appointment', receptionController.getAllAppointment)
router.put('/appointment/:id', receptionController.updateAppointment)
router.delete('/appointment/:id', receptionController.deleteAppointment)



router.post('/profile', receptionController.createPatient)
router.get('/profile', authMiddleware.isAuth, receptionController.getAllPatient)
router.put('/profile/:id', receptionController.updatePatient)
router.delete('/profile/:id', receptionController.deletePatient)



router.post('/diagnostic', receptionController.createDiagnostic)
router.delete('/diagnostic/:id', receptionController.deleteDiagnostic)




module.exports = router

