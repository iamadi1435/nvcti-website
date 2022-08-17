/* eslint-disable no-ex-assign */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ExternalApplicant = require('../models/ExternalApplicant')
const IITISMApplicant = require('../models/IITISMApplicant')
const { setHeader } = require('./api')
const NVCTIBadRequestException = require('../exceptions/NVCTIBadRequestException')
const NVCTIUnauthorizedException = require('../exceptions/NVCTIUnauthorisedException')
const NVCTIInternalServerException = require('../exceptions/NVCTIInternalServerException')
const NVCTIBaseExceptionHandler = require('../core/NVCTIBaseExceptionHandler')

const queryMapping = {
  iitism: IITISMApplicant,
  external: ExternalApplicant
}

const roleMapping = {
  admin: 'admin',
  applicant: 'applicant'
}

/**
 * Returns true if the request object contains a user object else false
 *
 * @param {Request} req
 * @return {boolean} status
 */
const isAuthenticated = (req) => {
  try {
    if (req) {
      if (req.user) return true
      else return false
    } else {
      throw new NVCTIInternalServerException(
        'Passed object is not an instance of Request'
      )
    }
  } catch (err) {
    throw new NVCTIBaseExceptionHandler(err)
  }
}

const Authorities = {
  READ: 'GET',
  WRITE: 'POST',
  UPDATE: 'PUT',
  DELETE: 'DELETE'
}

const onSuccessfulAuthentication = (req, res) => {
  if (req) addPermissionsToRequest(req.user, req.role)
  if (res) {
    setHeader(res, 'X-NVCTI-Authorization', 'Successful')
    setHeader(res, 'X-NVCTI-Role', 'Admin')
  }
}

const addPermissionsToRequest = (user, role) => {
  if (role === roleMapping.applicant) {
    user.permissions = [
      {
        subpaths: ['/applicant', '/application/:id'],
        authorities: [Authorities.READ, Authorities.WRITE, Authorities.UPDATE]
      }
    ]
  } else if (role === roleMapping.admin) {
    user.permissions = [
      {
        subpaths: ['/admin', '/admin/:id'],
        authorities: [Authorities.READ, Authorities.WRITE, Authorities.UPDATE]
      },
      {
        subpaths: ['/applicant', '/applicant/:id'],
        authorities: [Authorities.READ, Authorities.DELETE]
      },
      {
        subpaths: ['/message'],
        authorities: [Authorities.WRITE]
      }
    ]
  }
}

// Hash password
const hash = async (password) => {
  try {
    return await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT))
  } catch (err) {
    throw new NVCTIBaseExceptionHandler(err)
  }
}

// Verify hash
const verifyHash = async (provided, hashed) => {
  try {
    return await bcrypt.compare(provided, hashed)
  } catch (e) {
    throw new NVCTIBaseExceptionHandler(e)
  }
}

// Generate JWT
const generateJWT = (user) => {
  try {
    return jwt.sign(
      {
        id: user.id,
        adm: user.isAdmin ? 'true' : 'false',
        typ: user instanceof queryMapping.iitism ? 'iitism' : 'external'
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_VALIDITY || '30d' }
    )
  } catch (err) {
    throw new NVCTIBaseExceptionHandler(err)
  }
}

// Generate email code
const generateEmailCode = (user, type) => {
  try {
    return jwt.sign(
      {
        ema: user.email,
        typ: type
      },
      process.env.EMAIL_CODE_SECRET || 'email',
      { expiresIn: '1000d' }
    )
  } catch (err) {
    throw new NVCTIBaseExceptionHandler(err)
  }
}

// Generate password reset token
const generatePasswordResetToken = (user) => {
  try {
    return jwt.sign(
      {
        ema: user.email,
        typ: user instanceof queryMapping.iitism ? 'iitism' : 'external'
      },
      process.env.PASSWORD_RESET_SECRET,
      { expiresIn: '100d' }
    )
  } catch (err) {
    throw new NVCTIBaseExceptionHandler(err)
  }
}

// Verify JWT
const verifyJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret')
  } catch (err) {
    throw new NVCTIBaseExceptionHandler(err)
  }
}

const verifyPasswordResetToken = (token) => {
  try {
    return jwt.verify(token, process.env.PASSWORD_RESET_SECRET || 'secret')
  } catch (err) {
    throw new NVCTIBaseExceptionHandler(err)
  }
}

// Authentication middleware
const authenticate = async function (req, res, next) {
  try {
    let token = req.get('Authorization') || req.get('Authorisation')
    if (!token || (typeof token === 'string' && token.length <= 0)) {
      throw new NVCTIUnauthorizedException({
        message: 'Authorization/Authorisation header missing.'
      })
    }
    token = token.replace(/Bearer /, '')
    let decoded, user
    try {
      decoded = verifyJWT(token)
    } catch (e) {
      throw new NVCTIBadRequestException({ message: 'Invalid JWT supplied' })
    }

    if (decoded.adm === 'true' || decoded.typ === 'iitism') {
      user = await queryMapping.iitism.findByPk(decoded.id)
    } else if (decoded.typ === 'external') {
      user = await queryMapping.external.findByPk(decoded.id)
    }
    if (!user) {
      throw new NVCTIUnauthorizedException({
        message: 'No such user found. Have you signed up?'
      })
    }

    req.user = user
    // Changed (req.user.isAdmin === 1) => (req.user.isAdmin)
    if (req.user.isAdmin) {
      // Is admin
      req.role = roleMapping.admin
      req.type = 'iitism'
    } else {
      // Is not admin
      req.role = roleMapping.applicant
      if (user instanceof queryMapping.iitism) req.type = 'iitism'
      else if (user instanceof queryMapping.external) req.type = 'external'
    }
    onSuccessfulAuthentication(req, res)

    if (req.user && req.role && req.type) {
      next()
    } else {
      throw new NVCTIUnauthorizedException({
        message: 'Unauthorized because of credential error or server error'
      })
    }
  } catch (err) {
    if (!(err instanceof Error)) err = new NVCTIUnauthorizedException({})
    err = NVCTIBaseExceptionHandler(err)
    setHeader(res, 'X-NVCTI-Authorization', 'Failed')
    res.status(err.code)
    res.json(err)
  }
}

// Verify Admin
const verifyAdmin = async function (req, res, next) {
  if (req.role !== 'admin') {
    res.status(401).json({ message: 'Unauthorized User' })
  } else {
    next()
  }
}

module.exports = {
  queryMapping,
  roleMapping,
  isAuthenticated,
  Authorities,
  onSuccessfulAuthentication,
  addPermissionsToRequest,
  hash,
  verifyHash,
  generateJWT,
  generateEmailCode,
  verifyJWT,
  authenticate,
  verifyAdmin,
  generatePasswordResetToken,
  verifyPasswordResetToken
}
