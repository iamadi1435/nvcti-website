const { DataTypes } = require('sequelize')
const ApplicantSchema = require('./ApplicantSchema')
const sequelize = require('../utils/db').instance()

ApplicantSchema.instituteName = {
  type: DataTypes.STRING
}

const opts = {
  tableName: process.env.TABLE_EXTERNAL || 'TABLE_EXTERNAL',
  underscored: true,
  comment: 'Stores external applicants'
}

const ExternalApplicant = sequelize.define(
  'external_applicant',
  ApplicantSchema,
  opts
)

ExternalApplicant.beforeCreate((person) => {
  person.created_at = new Date()
  person.updated_at = new Date()
})

ExternalApplicant.beforeUpdate((person) => {
  person.updated_at = new Date()
})

ExternalApplicant.beforeSave(async (applicant) => {
  const { generateEmailCode, hash } = require('../utils/auth')
  if (applicant.isNewRecord) { applicant.emailCode = generateEmailCode(applicant, 'external') }
  if (applicant.previous().password !== applicant.password) { applicant.password = await hash(applicant.password) }
})

ExternalApplicant.attributes = ApplicantSchema
ExternalApplicant.opts = opts

module.exports = ExternalApplicant
