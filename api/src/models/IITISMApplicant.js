const { DataTypes } = require('sequelize')
const { isAdmissionNumber, isHostel } = require('../utils/validator')
const ApplicantSchema = require('./ApplicantSchema')
const sequelize = require('../utils/db').instance()

ApplicantSchema.hostel = {
  type: DataTypes.STRING,
  enum: [
    'Amber',
    'Jasper',
    'Sapphire',
    'Diamond',
    'Rosaline',
    'Ruby',
    'Topaz',
    'Opal',
    'Others'
  ]
  // validate: {
  //     isHostel
  // }
}
ApplicantSchema.admissionNumber = {
  type: DataTypes.STRING
  // validate: {
  //     isAdmissionNumber
  // },
  // allowNull: false,
  // unique: true
}
ApplicantSchema.isAdmin = {
  type: DataTypes.BOOLEAN,
  defaultValue: false
}

ApplicantSchema.role = {
  type: DataTypes.STRING,
  enum: ['Student', 'Staff', 'Admin', 'Faculty'],
  defaultValue: 'Student'
}

const opts = {
  tableName: process.env.TABLE_IITISM || 'TABLE_IITISM',
  underscored: true
}

const IITISMApplicant = sequelize.define(
  'iitism_applicant',
  ApplicantSchema,
  opts
)

IITISMApplicant.beforeCreate((person) => {
  person.created_at = new Date()
  person.updated_at = new Date()
})

IITISMApplicant.beforeUpdate((person) => {
  person.updated_at = new Date()
})
// Generate email code
IITISMApplicant.beforeSave(async (applicant) => {
  const { generateEmailCode, hash } = require('../utils/auth')
  if (applicant.isNewRecord) {
    applicant.emailCode = generateEmailCode(applicant, 'iitism')
  }
  if (applicant.previous().password !== applicant.password) {
    applicant.password = await hash(applicant.password)
  }
})

IITISMApplicant.attributes = ApplicantSchema
IITISMApplicant.opts = opts

module.exports = IITISMApplicant
