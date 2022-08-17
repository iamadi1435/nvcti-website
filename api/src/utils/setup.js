const Application = require('../models/Application')
const ExternalApplicant = require('../models/ExternalApplicant')
const IITISMApplicant = require('../models/IITISMApplicant')
const { instance } = require('./db')
const oDebug = require('debug')
const debug = oDebug('setup')
const warn = oDebug('NVCTI_WARN')

const sync = async (opts) => {
    await instance().sync(opts || { force: true })
    debug('Sync complete')
  },
  admin = async () => {
    try {
      const users = await IITISMApplicant.findAll({
        where: {
          isAdmin: 1
        }
      })
      if (!(!!users && users.length > 0)) {
        await IITISMApplicant.create({
          email: process.env.ADMIN_EMAIL || 'nvcti@iitism.ac.in',
          password: process.env.ADMIN_PASSWORD || 'password',
          admissionNumber: '00XX0000',
          name: 'Administrator',
          isAdmin: 1,
          verified: 1,
          role: 'Admin'
        })
      }
      debug('Admin setup complete.')
    } catch (e) {
      debug(e)
    }
  },
  populate = async () => {
    try {
      let i = 10
      while (i < 20) {
        const u = {
          email: 'a@b.co',
          password: 'password',
          admissionNumber: '00XX00',
          name: 'user ',
          verified: 1
        }
        u.email += i
        u.admissionNumber += i
        u.name += i
        i += 1
        await IITISMApplicant.create(u)
      }

      while (i < 30) {
        const u = {
          email: 'a@b.co',
          password: 'password',
          admissionNumber: '00XX00',
          name: 'user ',
          verified: 1
        }
        u.email += i
        u.admissionNumber += i
        u.name += i
        i += 1
        await ExternalApplicant.create(u)
      }

      let j = 0
      while (i < 40) {
        j += 1
        const model = {
          ideaDetails: 'wqereytrcyvubhilgyufktdursyyetrcyv' + i,
          iitismId: j,
          externalId: null,
          user: 'iitism',
          nvtilUnit: process.env.NVTIL_UNIT.split(',')[
            i%(process.env.NVTIL_UNIT.split(',').length)],
          titleOfProject: 'The coolest project ever - ' + i,
          applicationCategory: process.env.APPLICATION_CATEGORY.split(',')[
            i%(process.env.APPLICATION_CATEGORY.split(',').length)],
          objectiveOfProject: 'To create the coolest thing ever!',
          sourceOfFunding: 'Lemon juice'
        }
        i += 1
        await Application.create(model)
      }

      j = 0
      while (i < 50) {
        j += 1
        const model = {
          ideaDetails: 'wqereytrcyvubhilgyufktdursyyetrcyv' + i,
          iitismId: null,
          externalId: j,
          user: 'external',
          nvtilUnit: process.env.NVTIL_UNIT.split(',')[
            i%(process.env.NVTIL_UNIT.split(',').length)],
          titleOfProject: 'The coolest project ever - ' + i,
          applicationCategory: process.env.APPLICATION_CATEGORY.split(',')[
            i%(process.env.APPLICATION_CATEGORY.split(',').length)],
          objectiveOfProject: 'To create the coolest thing ever!',
          sourceOfFunding: 'Lemon juice'
        }
        i += 1
        await Application.create(model)
      }

      debug('Seed data loaded.')
    } catch (e) {
      debug(e)
    }
  }

const initial = async function (seedDummyData) {
  if (seedDummyData === 'false') return

  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    warn('DESTROYING AND RECREATING ALL TABLES')
    await sync()
  }

  await admin()

  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    warn('SEEDING DUMMY DATA')
    await populate()
  }
}

module.exports = {
  sync,
  admin,
  populate,
  initial
}
