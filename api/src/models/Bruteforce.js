/**
 * Not in use.
 * Probably never will be.
 */
const { DataTypes } = require('sequelize/types')
const { instance } = require('../utils/db')

const bruteForceSchema = {
  count: {
    type: DataTypes.NUMBER
  },
  lastRequest: {
    type: DataTypes.DATE
  },
  firstRequest: {
    type: DataTypes.Date
  },
  expires: {
    type: DataTypes.DATE
  },
  index: {
    type: DataTypes.STRING,
    defaultValue: '1d'
  }
}

const Bruteforce = instance().define('bruteforce', bruteForceSchema, {
  tableName: process.env.BRUTEFORCE_TABLE || 'TABLE_BRUTEFORCE',
  underscored: true
})

module.exports = Bruteforce
