const receptionRouter = require('../reception/reception.controllers')
const router = require('express').Router()
router.post('/reception',receptionRouter.createReception)
router.get('/reception',receptionRouter.getAllReception)
router.put('/reception:id',receptionRouter.updateReception)
router.delete('/reception:id',receptionRouter.deleteReception)
module.exports = router