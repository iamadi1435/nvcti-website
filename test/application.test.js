const { expect } = require('chai')

const { isJWT } = require('../api/src/utils/validator')
const responseValidator = require('./utils/request')('applications')

const iitismApplicantToken = process.env.IITISM_TOKEN
const externalApplicantToken = process.env.EXTERNAL_TOKEN
const adminToken = process.env.ADMIN_TOKEN

describe('Application API', () => {
  beforeEach(done => done())

  describe('Without valid JWT', () => {})

  describe('With an iitism JWT', () => {})

  describe('With an external JWT', () => {})

  describe('With an admin JWT', () => {})
})
