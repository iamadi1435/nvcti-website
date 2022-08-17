const { expect } = require('chai')

const { isJWT } = require('../api/src/utils/validator')
const responseValidator = require('./utils/request')('applicants')

const iitismApplicantToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiYWRtIjoiZmFsc2UiLCJ0eXAiOiJpaXRpc20iLCJpYXQiOjE2MTA2OTYxMjEsImV4cCI6MTYxMzI4ODEyMX0.2Yezp9MOZ0T-kIOoBmQZq2ENtPOzncx5toqOjc9gHQU'
const externalApplicantToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiYWRtIjoiZmFsc2UiLCJ0eXAiOiJleHRlcm5hbCIsImlhdCI6MTYxMDY5NjE2NiwiZXhwIjoxNjEzMjg4MTY2fQ.bC4Qy1zvn06i9n3Rai_RfCgfIl8ZG2PyWQ3KErMkg5I'
const adminToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtIjoidHJ1ZSIsInR5cCI6ImlpdGlzbSIsImlhdCI6MTYxMDY5NjIxMywiZXhwIjoxNjEzMjg4MjEzfQ.2Py_2YSbks0DxJ6N1tY_jEEmaFxA37IdbL5OiV1dfbM'

describe('Applicant API', () => {
  beforeEach((done) => {
    done()
  })

  describe('Without valid JWT', () => {
    describe('GET api/v1/applicants without token', () => {
      it('should not get a valid response', (done) => {
        responseValidator('', 401, 'get', done)
      })
    })

    describe('GET api/v1/applicants/1 without token', () => {
      it('should not get a valid response', (done) => {
        responseValidator('/1', 401, 'get', done)
      })
    })

    describe('POST api/v1/applicants without token', () => {
      it('should get a validation error', (done) => {
        responseValidator('', 400, 'post', done)
      })
    })

    describe('PATCH api/v1/applicants/1 without token', () => {
      it('should not get a valid response', (done) => {
        responseValidator('/1', 401, 'patch', done)
      })
    })

    describe('DELETE api/v1/applicants/1 without token', () => {
      it('should not get a valid response', (done) => {
        responseValidator('/1', 401, 'delete', done)
      })
    })

    describe('POST api/v1/applicants/login for IITISM applicants', () => {
      it('should get a valid JWT in response', (done) => {
        responseValidator('/login?type=iitism', 200, 'post', done, null, {
          email: 'a@b.co12',
          password: 'password'
        })
      })
    })

    describe('POST api/v1/applicants/login for External applicants', () => {
      it('should get a valid JWT in response', (done) => {
        responseValidator('/login?type=external', 200, 'post', done, null, {
          email: 'a@b.co24',
          password: 'password'
        })
      })
    })

    describe('POST api/v1/applicants/login for administrator', () => {
      it('should get a valid JWT in response', (done) => {
        responseValidator('/login?type=iitism', 200, 'post', done, null, {
          email: process.env.ADMIN_EMAIL || 'nvcti@iitism.ac.in',
          password: process.env.ADMIN_PASSWORD || 'password'
        })
      })
    })

    describe('POST login for IITISM with incorrect credentials', () => {
      it('should get an invalid response', (done) => {
        responseValidator('/login?type=iitism', 400, 'post', done, null, {
          email: 'a@b.co12',
          password: 'not-a-right-password'
        })
      })
    })
  })

  describe('With an iitism JWT', () => {
    describe('GET all applicants', () => {
      it('should get an unauthorised response', (done) => {
        responseValidator('/1?type=iitism', 401, 'get', done, iitismApplicantToken)
      })
    })

    describe('GET another applicant (1) of IITISM', () => {
      it('should get an unauthorised response', (done) => {
        responseValidator('/1?type=iitism', 401, 'get', done, iitismApplicantToken)
      })
    })

    describe('GET self applicant (4) of IITISM', () => {
      it('should get a valid response', (done) => {
        responseValidator('/4?type=iitism', 200, 'get', done, iitismApplicantToken)
      })
    })

    describe('GET another applicant (4) of External', () => {
      it('should get an unauthorised response', (done) => {
        responseValidator('/4?type=external', 401, 'get', done, iitismApplicantToken)
      })
    })

    describe('POST an applicant', () => {
      it('should get an unauthorised response', (done) => {
        responseValidator('?type=external', 400, 'post', done, iitismApplicantToken)
      })
    })

    describe('PATCH another applicant', () => {
      it('should get an unauthorised response', (done) => {
        responseValidator('/1?type=iitism', 401, 'patch', done, iitismApplicantToken)
      })
    })

    describe('PATCH self applicant', () => {
      it('should update the user', (done) => {
        responseValidator('/4?type=iitism', 200, 'patch', done, iitismApplicantToken)
      })
    })

    describe('DELETE any applicant', () => {
      it('should get unauthorised response', (done) => {
        responseValidator('/4?type=iitism', 401, 'delete', done, iitismApplicantToken)
      })
    })
  })

  describe('With an external JWT', () => {
    describe('GET all applicants', () => {
      it('should get an unauthorised response', (done) => {
        responseValidator('/1?type=external', 401, 'get', done, externalApplicantToken)
      })
    })

    describe('GET another applicant (1) of IITISM', () => {
      it('should get an unauthorised response', (done) => {
        responseValidator('/1?type=iitism', 401, 'get', done, externalApplicantToken)
      })
    })

    describe('GET self applicant (5) of External', () => {
      it('should get a valid response', (done) => {
        responseValidator('/5?type=external', 200, 'get', done, externalApplicantToken)
      })
    })

    describe('GET another applicant (1) of External', () => {
      it('should get an unauthorised response', (done) => {
        responseValidator('/1?type=external', 401, 'get', done, externalApplicantToken)
      })
    })

    describe('POST an applicant', () => {
      it('should get a validation error', (done) => {
        responseValidator('?type=external', 400, 'post', done, externalApplicantToken)
      })
    })

    describe('PATCH another applicant', () => {
      it('should get an unauthorised response', (done) => {
        responseValidator('/1?type=external', 401, 'patch', done, externalApplicantToken)
      })
    })

    describe('PATCH self applicant', () => {
      it('should update the applicant', (done) => {
        responseValidator('/5?type=external', 200, 'patch', done, externalApplicantToken)
      })
    })

    describe('DELETE any applicant', () => {
      it('should get unauthorised response', (done) => {
        responseValidator('/5?type=iitism', 401, 'delete', done, externalApplicantToken)
      })
    })
  })

  describe('With an admin JWT', () => {
    describe('GET all applicants', () => {
      it('should get a valid response', (done) => {
        responseValidator('?type=external', 200, 'get', done, adminToken)
      })
    })

    describe('POST an applicant', () => {
      it('should get a created document response', (done) => {
        responseValidator('?type=external', 200, 'post', done, adminToken, {
          email: 'mihir.19je0526@cse.iitism.ac.in',
          password: 'password',
          name: 'wxtsytfuygv'
        })
      })
    })

    describe('PATCH another applicant', () => {
      it('should update the applicant', (done) => {
        responseValidator('/6?type=external', 200, 'patch', done, adminToken)
      })
    })

    describe('PATCH self applicant', () => {
      it('should update the applicant', (done) => {
        responseValidator('/1?type=iitism', 200, 'patch', done, adminToken)
      })
    })

    describe('DELETE any applicant', () => {
      it('should get deleted response', (done) => {
        responseValidator('/2?type=iitism', 200, 'delete', done, adminToken)
      })
    })
  })
})
