/* eslint-disable no-ex-assign */
const Application = require('../models/Application')
const NVCTIBadRequestException = require('../exceptions/NVCTIBadRequestException')
const NVCTIUnauthorizedException = require('../exceptions/NVCTIUnauthorisedException')
const NVCTIBaseExceptionHandler = require('../core/NVCTIBaseExceptionHandler')

const { lookup, contentType } = require('mime-types')
const debug = require('debug')('applicant_controller')
const { readFile, deleteFile } = require('../utils/files')
const { roleMapping, queryMapping } = require('../utils/auth')
const NVCTIBaseException = require('../core/NVCTIBaseException')
const IITISMApplicant = require('../models/IITISMApplicant')
const ExternalApplicant = require('../models/ExternalApplicant')

async function handleDocument(req, res) {
  const q = req.query
  const id = req.params.appId
  const application = await Application.findByPk(id)
  const type = req.query.type ? req.query.type : 'iitism'
  if (
    req.role === roleMapping.admin ||
    (req.user.id.toString() === application[type + 'Id'].toString() &&
      req.type === type)
  ) {
    if (application && !application.deleted) {
      if (application.supportingDocumentPath) {
        await deleteFile(application.supportingDocumentPath)
      }

      const result = await Application.update(
        {
          supportingDocumentPath: req.filePath,
          supportingDocumentMimeType: lookup(req.filePath)
        },
        { where: { id, deleted: false } }
      )
      return result
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
}

function includeClauseGenerator(type) {
  let include = {
    model: queryMapping[type],
    attributes: {
      exclude: [
        'password',
        'emailCode',
        'isAdmin',
        'deleted',
        'verified',
        'passwordResetToken'
      ]
    }
  }
  return include
}

async function applicationFinder(req, type, userId) {
  const applications = {}

  if (!!userId && (req.user.id.toString() === userId || req.role === 'admin')) {
    applications.approved = await Application.findAll({
      where: {
        user: type,
        applicationVerdict: 'APPROVED',
        [type + 'Id']: userId
      },
      include: includeClauseGenerator(type)
    })
    applications.reverted = await Application.findAll({
      where: {
        user: type,
        applicationVerdict: 'REVERTED',
        [type + 'Id']: userId
      },
      include: includeClauseGenerator(type)
    })
    applications.rejected = await Application.findAll({
      where: {
        user: type,
        applicationVerdict: 'REJECTED',
        [type + 'Id']: userId
      },
      include: includeClauseGenerator(type)
    })
    applications.pending = await Application.findAll({
      where: {
        user: type,
        applicationVerdict: 'PENDING',
        [type + 'Id']: userId
      },
      include: includeClauseGenerator(type)
    })
  } else if (req.role === 'admin') {
    applications.approved = await Application.findAll({
      where: { user: type, applicationVerdict: 'APPROVED' },
      include: includeClauseGenerator(type)
    })
    applications.rejected = await Application.findAll({
      where: { user: type, applicationVerdict: 'REJECTED' },
      include: includeClauseGenerator(type)
    })
    applications.pending = await Application.findAll({
      where: { user: type, applicationVerdict: 'PENDING' },
      include: includeClauseGenerator(type)
    })
    applications.reverted = await Application.findAll({
      where: { user: type, applicationVerdict: 'REVERTED' },
      include: includeClauseGenerator(type)
    })
  } else {
    throw new NVCTIUnauthorizedException({
      message: 'You are not authorized to view this application'
    })
  }

  return applications
}

module.exports = {
  // @GET /application?type=??
  getAllApplication: async (req, res, next) => {
    try {
      let applications
      if (req.query && req.query.type) {
        if (req.query.type === 'iitism') {
          applications = await applicationFinder(
            req,
            'iitism',
            req.query.userId
          )
        } else if (req.query.type === 'external') {
          applications = await applicationFinder(
            req,
            'external',
            req.query.userId
          )
        } else {
          throw new NVCTIBadRequestException({
            message: '`type` parameter is incorrect.'
          })
        }
      } else {
        throw new NVCTIBadRequestException({
          message: '`type` parameter missing.'
        })
      }
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json(applications)
    } catch (err) {
      err = NVCTIBaseExceptionHandler(err)
      res.status(err.code).json(err)
    }
  },
  // @POST /application
  addNewApplication: async (req, res) => {
    try {
      let application = null
      if (req.role === 'admin') {
        throw new NVCTIUnauthorizedException({
          message: 'Admin cannot post application'
        })
      } else {
        // if (req.type === 'iitism') {
        //   application = await Application.findOne({
        //     where: { iitismId: req.user.id, applicationVerdict: 'PENDING' }
        //   })
        // } else {
        //   application = await Application.findOne({
        //     where: { externalId: req.user.id, applicationVerdict: 'PENDING' }
        //   })
        // }
        // console.log(req.user)
        if (!req.user.signatureImagePath || !req.user.applicantAvatarPath) {
          throw new NVCTIBaseException({
            message: 'Kindly upload your signature and avatar first'
          })
        } else {
          let newApplication = {}
          // if (req.body.ideaDetails) {
          newApplication = req.body
          if (req.type === 'iitism') {
            newApplication.iitismId = req.user.id
          } else {
            newApplication.externalId = req.user.id
          }
          newApplication.user = req.type

          if (req.filePath) {
            ;(newApplication.supportingDocumentPath = req.filePath),
              (newApplication.supportingDocumentMimeType = lookup(req.filePath))
          }

          const data = await Application.create(newApplication)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.json(data)
          // } else {
          //   throw new NVCTIBadRequestException({
          //     message: '`Idea details` missing'
          //   })
          // }
        }
      }
    } catch (err) {
      err = NVCTIBaseExceptionHandler(err)
      res.status(err.code).json(err)
    }
  },
  // @Delete Applications
  // deleteAllApplications: async (req, res) => {
  //   try {
  //     const data = await Application.update({ deleted: true }, { where: 1 });
  //     res.statusCode = 200;
  //     res.setHeader("Content-Type", "application/json");
  //     res.json(data);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
  // @Get Application By ID
  getApplicationById: async (req, res) => {
    try {
      const application = await Application.findByPk(req.params.appId, {
        include: [{ model: IITISMApplicant }, { model: ExternalApplicant }]
      })
      if (application) {
        if (req.role === 'admin') {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.json(application)
        } else if (
          req.type === 'iitism' &&
          application.iitismId === req.user.id
        ) {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.json(application)
        } else if (
          req.type === 'external' &&
          application.externalId === req.user.id
        ) {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.json(application)
        } else {
          throw new NVCTIUnauthorizedException({
            message: 'You are not authorized to read this application'
          })
        }
      } else {
        throw new NVCTIBadRequestException({
          message: `Cannot get application with Id ${req.params.appId}` // fixed (id) => (appId)
        })
      }
    } catch (err) {
      err = NVCTIBaseExceptionHandler(err)
      res.status(err.code).json(err)
    }
  },
  // @Update Application By ID
  updateApplicationById: async (req, res) => {
    try {
      if (!!req.filePath) {
        await handleDocument(req, res)
      }
      if (req.role === 'admin') {
        const updatingData = {}
        if (!req.user.signatureImagePath) {
          throw new NVCTIBaseException({
            message: 'Kindly upload your signature'
          })
        } else {
          if (req.body.remarks) {
            updatingData.remarks = req.body.remarks
          }
          if (req.body.applicationVerdict) {
            updatingData.applicationVerdict = req.body.applicationVerdict
          }
          let data = await Application.update(updatingData, {
            where: { id: req.params.appId }
          })
          if (data[0]) {
            data = await Application.findByPk(req.params.appId, {
              include: [
                { model: IITISMApplicant },
                { model: ExternalApplicant }
              ]
            })
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(data)
          } else {
            throw new NVCTIBadRequestException({
              message:
                'Either you are unauthorised or' +
                'no application or multiple applications were found.'
            })
          }
        }
      } else {
        let data
        // if (req.body.ideaDetails) {
        //   uploadingData.ideaDetails = req.body.ideaDetails
        req.body.remarks = undefined
        req.body.applicationVerdict = 'PENDING'
        if (req.type === 'iitism') {
          data = await Application.update(req.body, {
            where: {
              id: req.params.appId,
              iitismId: req.user.id,
              applicationVerdict: 'REVERTED'
            }
          })
        } else {
          data = await Application.update(req.body, {
            where: {
              id: req.params.appId,
              externalId: req.user.id,
              applicationVerdict: 'REVERTED'
            }
          })
        }
        if (data[0]) {
          data = await Application.findByPk(req.params.appId, {
            include: [{ model: IITISMApplicant }, { model: ExternalApplicant }]
          })
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.json(data)
        } else {
          throw new NVCTIBadRequestException({
            message: 'Your are uauthorized to update the application'
          })
        }
        // } else {
        //   throw new NVCTIUnauthorizedException({
        //     message: 'Your are uauthorized to update the application'
        //   })
        // }
      }
    } catch (err) {
      err = NVCTIBaseExceptionHandler(err)
      res.status(err.code).json(err)
    }
  },
  // Delete application by Id
  deleteApplicationById: async (req, res) => {
    try {
      if (req.role === 'admin') {
        const application = await Application.update(
          { deleted: true },
          { where: { id: req.params.appId } }
        )
        if (application[0]) {
          res.status(200).json({
            message: `Deleted application with id ${req.params.appId}`
          })
        } else {
          throw new NVCTIBadRequestException({
            message: 'No such application found.'
          })
        }
      } else {
        let application = await Application.findByPk(req.params.appId, {
          include: [{ model: IITISMApplicant }, { model: ExternalApplicant }]
        })
        if (req.type === 'iitism') {
          if (application.iitismId === req.user.id) {
            application.deleted = true
            application = await application.save()
            res.status(200).json({
              message: `Deleted application with id ${application.id}`
            })
          } else {
            throw new NVCTIUnauthorizedException({
              message: 'You are unauthorized to delete this application'
            })
          }
        } else {
          if (application.externalId === req.user.id) {
            application.deleted = true
            application = await application.save()
            res.status(200).json({
              message: `Deleted application with id ${application.id}`
            })
          } else {
            throw new NVCTIUnauthorizedException({
              message: 'You are unauthorized to delete this application'
            })
          }
        }
      }
    } catch (err) {
      err = NVCTIBaseExceptionHandler(err)
      res.status(err.code).json(err)
    }
  },

  updateSupportingDocument: async function (req, res) {
    try {
      if (req.filePath) {
        const result = await handleDocument(req, res)
        res.json(result)
      } else
        throw new NVCTIBadRequestException({
          message: 'File is not present or is invalid'
        })
    } catch (err) {
      err = NVCTIBaseExceptionHandler(err)
      res.status(err.code).json(err)
    }
  },

  getSupportingDocument: async function (req, res) {
    try {
      const q = req.query
      const id = req.params.id
      const application = await Application.findByPk(id)
      const type = req.query.type ? req.query.type : 'iitism'
      if (
        req.role === roleMapping.admin ||
        (req.user.id.toString() === application[type + 'Id'].toString() &&
          req.type === type)
      ) {
        if (application && !application.deleted) {
          res.type(contentType(application.supportingDocumentMimeType))
          res.send(await readFile(application.supportingDocumentPath))
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
    } catch (err) {
      err = NVCTIBaseExceptionHandler(err)
      res.status(err.code).json(err)
    }
  }
}
