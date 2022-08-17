const { getPdf } = require('../controllers/pdf')
const { authenticate, verifyAdmin } = require('../utils/auth')
const router = require('express').Router()

router.get('/:id', authenticate, verifyAdmin, getPdf)
module.exports = router
