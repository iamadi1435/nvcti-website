const validator = require('validator').default
const debug = require('debug')('validator')
const NVCTIValidationException = require('../exceptions/NVCTIValidationException')

module.exports = {
  isEmail: v => {
    if (!(validator.isEmail(v))) {
      throw new NVCTIValidationException({
        message: 'Not a valid email'
      })
    }
    return true
  },
  isPhone: v => {
    if (!(validator.isMobilePhone(v))) {
      throw new NVCTIValidationException({
        message: 'Not a valid phone number'
      })
    }
    return true
  },
  isAdmissionNumber: v => {
    if (!((new RegExp('[0-9]+[a-zA-Z]+[0-9]+')).test(v))) {
      throw new NVCTIValidationException({
        message: 'Not a valid admission number'
      })
    }
    return true
  },
  isGender: v => {
    if (!/(MALE)|(FEMALE)|(NON-BINARY)|(UNSPECIFIED)/.test(v)) {
      throw new NVCTIValidationException({
        message: 'Not a valid gender'
      })
    }
    return true
  },
  isDOB: v => {
    if (!(validator.isDate(v))) {
      throw new NVCTIValidationException({
        message: 'Not a valid date'
      })
    }
    return true
  },
  isHostel: v => {
    if (!/[a-zA-Z ]+/.test(v)) {
      throw new NVCTIValidationException({
        message: 'Not a valid hostel name'
      })
    }
    return true
  },
  isOneLine: v => {
    if (!/[a-zA-Z 0-9]/.test(v)) {
      throw new NVCTIValidationException({
        message: 'Only one line input is allowed'
      })
    }
    return true
  },
  isProperPassword: v => {
    const options = { minLength: 6 }
    if (typeof v !== 'string') { throw new NVCTIValidationException('Invalid value supplied') }
    if (!validator.isStrongPassword(v, options)) {
      throw new NVCTIValidationException('Insecure password')
    }

    return true
  },
  isHashed: v => {
    if (!(validator.isHash(v))) {
      throw new NVCTIValidationException({
        message: 'Not a valid password hash'
      })
    }
    return true
  },
  isJWT: v => {
    if (!(validator.isJWT(v))) {
      throw new NVCTIValidationException({
        message: 'Not a valid JWT'
      })
    }
    return true
  },
  isNotProfane: v => {
    const { profanity: filter } = require('./tools')
    if (filter(v, 'isProfane')) {
      throw new NVCTIValidationException({
        name: 'Profane text',
        message: 'Text contains profanity'
      })
    }
    return true
  }
}
