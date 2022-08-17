const path = require('path')
const router = require('express').Router()

const { authenticate } = require('../utils/auth')
const controller = require('../controllers/applicant')
const { bruteforce } = require('../utils/api')
const {
  multerConfig,
  storageLimits,
  fileFilter,
  fileStorage,
  directoryNames
} = require('../utils/files')
const debug = require('debug')('applicant_router')

const imageUpload = function (directory) {
  return multerConfig({
    limits: storageLimits.images,
    fileFilter: fileFilter('images'),
    storage: fileStorage(directory)
  })
}

// get many
router.get('/', authenticate, controller.getAll)

// get one
router.get('/:id/avatar', controller.getOneAvatar)

// get one
router.get('/:id/signature', controller.getOneSignature)

// get one
router.get('/:id', authenticate, controller.getOne)

// add
router.post('/', controller.addOne)

// update
router.patch('/:id', authenticate, controller.updateOne)

// delete
router.delete('/:id', authenticate, controller.deleteOne)

// login
router.post('/login', bruteforce().prevent, controller.login)

// forgot password
router.post('/forgot-password', bruteforce().prevent, controller.forgotPassword)

// add avatar
router.put(
  '/:id/avatar',
  bruteforce().prevent,
  authenticate,
  imageUpload(directoryNames.avatars).single('avatar'),
  // upload.single('avatar'),
  controller.addAvatar
)

// add signature
router.put(
  '/:id/signature',
  bruteforce().prevent,
  authenticate,
  imageUpload(directoryNames.signatures).single('signature'),
  // upload.single('signature'),
  controller.addSignature
)

module.exports = router
