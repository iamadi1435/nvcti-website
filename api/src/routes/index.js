const router = require('express').Router()

const applicant = require('./applicant')
const admin = require('./admin')
const message = require('./message')
const application = require('./application')
const confirmRouter = require('./confirm')
const pdfRouter = require('./pdf')

router.use(`/applicants`, applicant)
router.use(`/admins`, admin)
router.use(`/applications`, application)
router.use(`/messages`, message)
router.use(`/confirm`, confirmRouter)
router.use(`/pdf`, pdfRouter)

module.exports = router
