const mongoose = require('mongoose')
const debug = require('debug')('applicant_model')

const validator = require('../utils/validator')
const { messageFormatter, timeToTime } = require('../utils/tools')
const { hash, generateEmailCode, generateJWT } = require('../utils/auth')

const tokenSchema = new mongoose.Schema({
  token: {
    type: String
  },
  expires: {
    type: String,
    trim: true

  }
},
{
  timestamps: true
})
const applicantSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  admissionNumber: {
    type: String,
    trim: true,
    validate: {
      validator: validator.isAdmissionNumber,
      message: ({ value }) => (`${value} is not a valid admission number!`)
    }
  },
  gender: {
    type: String,
    trim: true,
    enum: ['MALE', 'FEMALE', 'NON-BINARY', 'UNSPECIFIED'],
    validate: {
      validator: validator.isGender,
      message ({ value }) { return (`${value} is not a valid gender!`) }
    },
    default: 'UNSPECIFIED'
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    validate: {
      validator: validator.isEmail,
      message ({ value }) { return (`${value} is not a valid email!`) }
    }
  },
  course: {
    type: String,
    trim: true
  },
  branch: {
    type: String,
    trim: true
  },
  contactNumber: {
    type: String,
    trim: true,
    validate: {
      validator: validator.isPhone,
      message: ({ value }) => (`${value} is not a valid phone number`)
    }
  },
  hostel: {
    type: String,
    trim: true,
    required: function () {
      return [
        this.admissionNumber !== null,
        messageFormatter('Hostel rquired when Admission Number is supplied.')
      ]
    },
    enum: [
      // list of hostels
    ],
    validate: {
      validator: validator.isHostel,
      message: ({ value }) => (`${value} is not a valid hostel string`)
    }
  },
  dateOfBirth: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: validator.isDOB,
      message: ({ value }) => (`${value} is not a valid date`)
    }
  },
  permanentAddress: {
    type: String,
    trim: true
  },
  instituteName: {
    type: String,
    trim: true,
    maxLength: 1000,
    validate: {
      validator: validator.isOneLine,
      message: ({ value }) => (`${value} is not a institute name string`)
    },
    required: function () {
      return this.admissionNumber === null
    }
  },
  photo: {
    type: Buffer
  },
  photoFormat: {
    type: String,
    trim: true,
    enum: [
      'image/jpeg',
      'image/png',
      'image/tiff',
      'image/jpg'
    ]
  },
  passwordHash: {
    type: String,
    validate: {
      validator: validator.isHashed,
      message: ({ value }) => (`${value} is not hashed`)
    },
    trim: true
  },
  tokens: {
    type: [tokenSchema]
  },
  emailCode: {
    type: String,
    trim: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

/**
 * Pre-processor
 */
applicantSchema.pre('save', async (next) => {
  const user = this
  if (user.isModified('passwordHash')) {
    debug('Password was modified')
    user.passwordHash = await hash(passwordHash)
  }
  next()
})

/**
 * Methods
 */
applicantSchema.methods.saveJWTAndEmailCode = async function () {
  const token = generateJWT(this)
  const code = generateEmailCode(this)
  this.tokens = this.tokens.concat({
    token,
    expires: Date.now() + timeToTime(process.env.JWT_VALIDITY)
  })

  try {
    await this.updateOne(
      { _id: user._id }, { tokens: this.tokens, emailCode: code })
    return token
  } catch (err) {
    debug(err)
  }
}

applicantSchema.methods.saveEmailCode = async function () {
  const code = generateEmailCode(this)
  try {
    await user.updateOne({ _id: user._id }, { emailCode: code })
    return code
  } catch (err) {
    debug(err)
  }
}

applicantSchema.methods.saveJWT = async function () {
  const token = generateJWT(this)
  this.tokens = this.tokens.concat({
    token,
    expires: Date.now() + timeToTime(process.env.JWT_VALIDITY)
  })
  try {
    await user.updateOne({
      _id: user._id
    }, {
      tokens: this.tokens
    })
    return token
  } catch (err) {
    debug(err)
  }
}

/**
 * Export to JSON
 */
applicantSchema.methods.toJSON = function () {
  const userObject = this.toObject({ virtuals: true })
  delete userObject.__v
  delete userObject.photo
  delete userObject.photoFormat
  delete userObject.passwordHash
  delete userObject.tokens

  debug('Formatted JSON')
  return userObject
}

/**
 * Virtual fields
 */
applicantSchema.virtual('avatarURL')
  .get(function (_value, _virtual, _doc) {
    debug('Virtual field avatarURL added')
    return `${process.env.API_URL}/applicant/avatar/${this._id}`
  })

exports.Applicant = mongoose.model('Applicant', applicantSchema)
