const { DataTypes } = require('sequelize')
const { instance } = require('../utils/db')
const { isNotProfane } = require('../utils/validator')
const IITISMApplicant = require('./IITISMApplicant')
const ExternalApplicant = require('./ExternalApplicant')

const NVCTIBadRequestException = require('../exceptions/NVCTIBadRequestException')

const sequelize = instance()
const attributes = {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    comment: 'Primary key for indexing',
    autoIncrementIdentity: true
  },
  ideaDetails: {
    type: DataTypes.TEXT('medium'),
    allowNull: true,
    comment:
      'Full length description of the idea.' +
      'Probably should support something like markdown.',
    validate: {
      isNotProfane
    }
  },
  iitismId: {
    type: DataTypes.BIGINT.UNSIGNED,
    references: {
      model: IITISMApplicant,
      key: 'id'
    }
  },
  externalId: {
    type: DataTypes.BIGINT.UNSIGNED,
    references: {
      model: ExternalApplicant,
      key: 'id'
    }
  },
  user: {
    type: DataTypes.ENUM(['iitism', 'external']),
    defaultValue: 'iitism'
  },
  remarks: {
    type: DataTypes.TEXT('medium')
  },
  applicationStatus: {
    type: DataTypes.ENUM(...process.env.APPLICATION_STATUS.split(',')),
    defaultValue: process.env.DEFAULT_STATUS || 'EDITING'
  },
  applicationVerdict: {
    type: DataTypes.ENUM(...process.env.APPLICATION_VERDICT.split(',')),
    defaultValue: process.env.DEFAULT_VERDICT || 'PENDING'
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  applicationCategory: {
    type: DataTypes.ENUM(...process.env.APPLICATION_CATEGORY.split(',')),
    allowNull: false
  },
  nvtilUnit: {
    type: DataTypes.ENUM(...process.env.NVTIL_UNIT.split(',')),
    allowNull: false
  },
  titleOfProject: {
    type: DataTypes.TEXT('medium'),
    allowNull: false
  },
  objectiveOfProject: {
    type: DataTypes.TEXT('medium'),
    allowNull: false
  },
  nameOfMentor: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  numberOfMembers: {
    type: DataTypes.BIGINT.UNSIGNED,
    defaultValue: 1
  },
  sourceOfFunding: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  supportingDocumentPath: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  supportingDocumentMimeType: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}
const opts = {
  underscored: true,
  tableName: process.env.TABLE_APPLICATION || 'TABLE_APPLICATION',
  comment:
    'Stores every application created by both' +
    'internal and external applicants',
  indexes: [{ unique: true, fields: ['id'] }]
}
const Application = sequelize.define('Application', attributes, opts)

Application.beforeCreate((person) => {
  person.created_at = new Date()
  person.updated_at = new Date()
})

Application.beforeUpdate((person) => {
  person.updated_at = new Date()
})

Application.attributes = attributes
Application.opts = opts
Application.belongsTo(IITISMApplicant, {
  foreignKey: 'iitism_id',
  foreignKeyConstraint: true
})
Application.belongsTo(ExternalApplicant, {
  foreignKey: 'external_id',
  foreignKeyConstraint: true
})

Application.beforeSave((application) => {
  const applicationCategories = process.env.APPLICATION_CATEGORY.split(
    ','
  ).slice(0, 3)
  if (
    applicationCategories.findIndex(
      (v) => v === application.applicationCategory
    ) > 0 &&
    !application.sourceOfFunding
  ) {
    throw new NVCTIBadRequestException({
      message:
        'Source of funding is required for application categories ' +
        applicationCategories.join(', ')
    })
  }
})

module.exports = Application
