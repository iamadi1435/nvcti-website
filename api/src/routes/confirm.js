const router = require('express').Router()

const { confirmEmail, confirmReset } = require('../controllers/confirm')

router.get('/email', confirmEmail)

router.post('/reset', confirmReset)

module.exports = router
