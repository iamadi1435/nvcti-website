/* eslint-disable no-ex-assign */
const path = require('path')

const { generateResponse } = require('../utils/api')
const {
  queryMapping,
  roleMapping,
  verifyHash,
  generateJWT,
  hash,
  generatePasswordResetToken
} = require('../utils/auth')

const NVCTIBadRequestException = require('../exceptions/NVCTIBadRequestException')
const NVCTIUnauthorizedException = require('../exceptions/NVCTIUnauthorisedException')
const NVCTIBaseExceptionHandler = require('../core/NVCTIBaseExceptionHandler')

const { generateQueryObject } = require('../utils/api')

const IITISMApplicant = require('../models/IITISMApplicant')
const ExternalApplicant = require('../models/ExternalApplicant')

const send = require('../mail/mailer')
const { sendMail } = require('../utils/message')
const { FORGOT_PASSWORD, REGISTRATION } = require('../mail/templates')
const { compressImage } = require('../utils/tools')

const { lookup, contentType } = require('mime-types')
const debug = require('debug')('applicant_controller')

const { readFile, deleteFile } = require('../utils/files')

module.exports = {
  // @GET /applicant
  getAll: async function (req, res) {
    // instead of this if/else block
    // we could have a separate function that verifies
    // req.user.permissions with req.originalUrl

    if (req.role === roleMapping.admin) {
      try {
        let applicants = {}
        if (req.query && req.query.type) {
          const q = req.query
          const type = queryMapping[q.type || 'iitism']
          delete q.type
          const qo = generateQueryObject(q)
          qo.where.deleted = false
          applicants = await type.findAll(qo)
        } else {
          applicants.iitism = await IITISMApplicant.findAll()
          applicants.external = await ExternalApplicant.findAll()
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(applicants)
      } catch (e) {
        e = NVCTIBaseExceptionHandler(e)
        res.status(e.code).json(e)
      }
    } else {
      const e = new NVCTIUnauthorizedException({
        message: 'Requested user is not authorized to perform this action'
      })

      res.status(e.code).json(e)
    }
  },

  getOne: async function (req, res) {
    if (
      req.role === roleMapping.admin ||
      (req.user.id.toString() === req.params.id &&
        req.type === (req.query.type ? req.query.type : 'iitism'))
    ) {
      try {
        const id = req.params.id
        const type = queryMapping[req.query.type || req.type || 'iitism']
        const user = await type.findByPk(id)
        if (user && !user.deleted) res.json(generateResponse(user))
        else {
          throw new NVCTIBadRequestException({
            message: 'The specified user does not exist anymore.'
          })
        }
      } catch (e) {
        e = NVCTIBaseExceptionHandler(e)
        res.status(e.code).json(e)
      }
    } else {
      const e = new NVCTIUnauthorizedException({})
      res.status(e.code).json(e)
    }
  },

  addOne: async function (req, res) {
    const q = req.query
    const type = queryMapping[q.type || 'iitism']
    let id = null
    try {
      const allowedEntries = [
        'name',
        'email',
        'gender',
        'course',
        'branch',
        'contactNumber',
        'dateOfBirth',
        'permanentAddress',
        'password',
        'admissionNumber',
        'hostel',
        'instituteName'
      ]
      const userObject = {}
      allowedEntries.forEach((key) => {
        userObject[key] = req.body[key]
      })
      const applicant = await type.create(userObject)
      id = applicant.id

      // Email code
      const url = `${process.env.API_URL}/confirm/email?token=${applicant.emailCode}`

      // Send email
      const mailOptions = { to: applicant.email }
      const mailVariables = { url }

      await send(REGISTRATION, mailOptions, mailVariables)

      const dto = {}
      const exclude = ['emailCode', 'password', 'isAdmin']
      for (let prop in applicant.dataValues)
        if (!exclude.includes(prop))
          dto[prop] = applicant.dataValues[prop]

      const messageSent = {
        success: true,
        from: req.body.email,
        applicant
      }
      res.json(dto)
    } catch (e) {
      e = NVCTIBaseExceptionHandler(e)
      if (id) type.destroy({ where: { id } })
      res.status(e.code).json(e)
    }
  },

  deleteOne: async function (req, res) {
    if (req.role === roleMapping.admin) {
      try {
        const q = req.query
        const type = queryMapping[q.type || req.type || 'iitism']
        const result = await type.update(
          { deleted: true },
          {
            where: {
              id: req.params.id
            }
          }
        )
        res.json(generateResponse(result))
      } catch (e) {
        e = NVCTIBaseExceptionHandler(e)
        res.status(e.code).json(e)
      }
    } else {
      const e = new NVCTIUnauthorizedException({
        message: 'Requested user is not authorized to perform this action'
      })

      res.status(e.code).json(e)
    }
  },

  updateOne: async function (req, res) {
    if (
      req.role === roleMapping.admin ||
      (req.user.id.toString() === req.params.id &&
        req.type === (req.query.type ? req.query.type : 'iitism'))
    ) {
      try {
        const allowedEntries = [
          'name',
          'gender',
          'course',
          'branch',
          'contactNumber',
          'dateOfBirth',
          'permanentAddress',
          'password',
          'admissionNumber',
          'hostel',
          'instituteName'
        ]
        if (req.body.password) req.body.password = await hash(req.body.password)
        const q = req.query
        const type = queryMapping[q.type || req.type || 'iitism']
        Object.keys(req.body).forEach((key) => {
          if (allowedEntries.indexOf(key) === -1) {
            delete req.body[key]
          }
        })
        const result = await type.update(req.body, {
          where: {
            id: req.params.id,
            deleted: false
          }
        })
        res.json(generateResponse(result))
      } catch (e) {
        e = NVCTIBaseExceptionHandler(e)
        res.status(e.code).json(e)
      }
    } else {
      const e = new NVCTIUnauthorizedException({
        message: 'Requested user is not authorized to perform this action'
      })

      res.status(e.code).json(e)
    }
  },

  login: async function (req, res) {
    // Take email and password
    // return JWT
    try {
      const type = queryMapping[req.query.type || req.type || 'iitism']
      const user = await type.findOne({
        where: {
          email: req.body.email
        }
      })
      if (!user) {
        res.status(404).json({ message: 'No Such User Found' })
      } else if (!user.verified) {
        res.status(401).json({ message: 'Verify your email Address' })
      } else {
        const authenticated = await verifyHash(req.body.password, user.password)
        if (authenticated) {
          res.status(200).json({
            token: generateJWT(user),
            message: 'Successfully logged in'
          })
        } else {
          throw new NVCTIBadRequestException({
            message: 'Incorrect email/password combination'
          })
        }
      }
    } catch (e) {
      e = NVCTIBaseExceptionHandler(e)
      res.status(e.code).json(e)
    }
  },

  forgotPassword: async function (req, res) {
    try {
      const type = queryMapping[req.query.type || req.type || 'iitism']
      const email = req.body.email
      if (!email) {
        throw new NVCTIBadRequestException({ message: 'Email missing' })
      }
      const user = await type.findOne({
        where: {
          email: req.body.email
        }
      })

      if (!user) {
        throw new NVCTIBadRequestException({ message: 'User not found' })
      }

      let url = (process.env.HOST_URL || '') + '/forgot-password?token='
      let token
      if (user.passwordResetToken) {
        token = user.passwordResetToken
      } else {
        token = generatePasswordResetToken(user)
        await type.update(
          {
            passwordResetToken: token
          },
          {
            where: {
              email: req.body.email
            }
          }
        )
      }

      url += token

      await sendMail(FORGOT_PASSWORD, { to: email }, { url })

      res.json({ success: true, message: 'Email sent' })
    } catch (err) {
      err = NVCTIBaseExceptionHandler(err)
      res.status(err.code).json(err)
    }
  },

  addAvatar: async function (req, res) {
    try {
      if (req.filePath) {
        const q = req.query
        const type = queryMapping[q.type || req.type || 'iitism']
        if (
          req.role === roleMapping.admin ||
          (req.user.id.toString() === req.params.id &&
            req.type === (req.query.type ? req.query.type : 'iitism'))
        ) {
          const id = req.params.id
          const user = await type.findByPk(id)
          if (user && !user.deleted) {
            await compressImage(req.filePath)
            if (user.applicantAvatarPath) {
              await deleteFile(user.applicantAvatarPath)
            }

            const result = await type.update(
              {
                applicantAvatarPath: req.relativeFilePath,
                applicantAvatarMimeType: lookup(req.filePath)
              },
              { where: { id, deleted: false } }
            )
            res.json(generateResponse(result))
          } else {
            throw new NVCTIBadRequestException({
              message:
                'The specified user either never existed or does not exist anymore.'
            })
          }
        } else {
          const e = new NVCTIUnauthorizedException({})
          res.status(e.code).json(e)
        }
      } else
        throw new NVCTIBadRequestException({
          message: 'File is not present or is invalid'
        })
    } catch (err) {
      err = NVCTIBaseExceptionHandler(err)
      res.status(err.code).json(err)
    }
  },

  addSignature: async function (req, res) {
    try {
      if (req.filePath) {
        const q = req.query
        const type = queryMapping[q.type || req.type || 'iitism']
        if (
          req.role === roleMapping.admin ||
          (req.user.id.toString() === req.params.id &&
            req.type === (req.query.type ? req.query.type : 'iitism'))
        ) {
          const id = req.params.id
          const user = await type.findByPk(id)
          if (user && !user.deleted) {
            await compressImage(req.filePath)
            if (user.signatureImagePath) {
              await deleteFile(user.signatureImagePath)
            }

            const result = await type.update(
              {
                signatureImagePath: req.relativeFilePath,
                signatureImageMimeType: lookup(req.filePath)
              },
              { where: { id, deleted: false } }
            )
            res.json(generateResponse(result))
          } else {
            throw new NVCTIBadRequestException({
              message:
                'The specified user either never existed or does not exist anymore.'
            })
          }
        } else {
          const e = new NVCTIUnauthorizedException({})
          res.status(e.code).json(e)
        }
      } else
        throw new NVCTIBadRequestException({
          message: 'File is not present or is invalid'
        })
    } catch (err) {
      err = NVCTIBaseExceptionHandler(err)
      res.status(err.code).json(err)
    }
  },

  getOneSignature: async function (req, res) {
    try {
      const q = req.query
      const type = queryMapping[q.type || req.type || 'iitism']
      // if (
      //   req.role === roleMapping.admin ||
      //   (req.user.id.toString() === req.params.id &&
      //     req.type === (req.query.type ? req.query.type : 'iitism'))
      // ) {
      const id = req.params.id
      const user = await type.findByPk(id)
      if (
        user &&
        !user.deleted &&
        user.signatureImageMimeType &&
        user.signatureImagePath
      ) {
        res.type(contentType(user.signatureImageMimeType))
        res.send(await readFile(path.resolve(__dirname, '../..', user.signatureImagePath)))
      } else {
        throw new NVCTIBadRequestException({
          message:
            'The specified user either never existed or does not exist anymore.'
        })
      }

      // } else {
      //   const e = new NVCTIUnauthorizedException({})
      //   res.status(e.code).json(e)
      // }
    } catch (err) {
      err = NVCTIBaseExceptionHandler(err)
      res.status(err.code).json(err)
    }
  },

  getOneAvatar: async function (req, res) {
    try {
      const q = req.query
      const type = queryMapping[q.type || req.type || 'iitism']
      // if (
      //   req.role === roleMapping.admin ||
      //   (req.user.id.toString() === req.params.id &&
      //     req.type === (req.query.type ? req.query.type : 'iitism'))
      // ) {
      const id = req.params.id
      const user = await type.findByPk(id)
      if (user && !user.deleted) {
        res.type(contentType(user.applicantAvatarMimeType))
        res.send(await readFile(path.resolve(__dirname, '../..', user.applicantAvatarPath)))
      } else {
        throw new NVCTIBadRequestException({
          message:
            'The specified user either never existed or does not exist anymore.'
        })
      }
      // } else {
      //   const e = new NVCTIUnauthorizedException({})
      //   res.status(e.code).json(e)
      // }
    } catch (err) {
      err = NVCTIBaseExceptionHandler(err)
      res.status(err.code).json(err)
    }
  }
}
