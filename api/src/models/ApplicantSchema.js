const { DataTypes } = require('sequelize')
const {
  isGender,
  isEmail,
  isPhone,
  isDOB,
  isHashed,
  isJWT
} = require('../utils/validator')

module.exports = {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    comment: 'Primary key for indexing'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('MALE', 'FEMALE', 'NON-BINARY', 'UNSPECIFIED'),
    // validate: {
    //     isGender
    // },
    defaultValue: 'UNSPECIFIED'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    // validate: {
    //     isEmailAddress: isEmail
    // },
    unique: true
  },
  course: {
    type: DataTypes.STRING
  },
  branch: {
    type: DataTypes.STRING
  },
  contactNumber: {
    type: DataTypes.STRING
    // validate: {
    //     isPhone
    // }
  },
  dateOfBirth: {
    type: DataTypes.STRING
    // validate: {
    //     isDOB
    // }
  },
  permanentAddress: {
    type: DataTypes.TEXT('medium')
  },
  password: {
    type: DataTypes.STRING
    // validate: {
    //     isHashed
    // }
  },
  emailCode: {
    type: DataTypes.STRING
    // validate: {
    //     isJWT
    // }
  },
  verified: {
    type: DataTypes.TINYINT(1),
    defaultValue: 0
  },
  deleted: {
    type: DataTypes.TINYINT(1),
    defaultValue: 0
  },
  isAdmin: {
    type: DataTypes.TINYINT(1),
    defaultValue: 0
  },
  passwordResetToken: {
    type: DataTypes.STRING
  },
  signatureImagePath: {
    type: DataTypes.STRING,
    allowNull: true
  },
  signatureImageMimeType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  applicantAvatarPath: {
    type: DataTypes.STRING,
    allowNull: true
  },
  applicantAvatarMimeType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  updated_at: DataTypes.DATE,
  created_at: DataTypes.DATE
}
