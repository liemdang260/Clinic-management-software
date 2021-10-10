const authenticationRouter = require("../authentication/authentication.controllers")
const router = require('express').Router()
router.post('/',authenticationRouter.handleLogin)

module.exports = router