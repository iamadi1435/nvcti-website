const router = require('express').Router()

const controller = require('../controllers/admin')
const { authenticate } = require('../utils/auth')

// get one
router.get('/:id', authenticate, controller.getOne)

// update
router.patch('/:id', authenticate, controller.updateOne)

// delete
router.delete('/:id', authenticate, controller.deleteOne)

// login
router.post('/login', controller.login)

module.exports = router
