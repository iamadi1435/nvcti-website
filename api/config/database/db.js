const { Sequelize } = require('sequelize')
const debug = require('debug')('mysql')

const { user, password, name, options } = require('./db.config')
const sequelize = new Sequelize(name, user, password, options)

async function connect () {
  try {
    await sequelize.authenticate()
    debug('Connected successfully to mysql with %s@%s',
      user, options.host)
  } catch (e) {
    debug('MySQL connection error: ', e)
  }
}

module.exports = { connect, sequelize }
