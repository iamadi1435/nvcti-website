const router = require('express').Router()
const { sendMessage } = require('../controllers/message')
const { bruteforce } = require('../utils/api')

router.post('/', bruteforce().prevent, sendMessage)

module.exports = router
