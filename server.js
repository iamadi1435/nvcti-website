(async function (port, callback) {
  const { join } = require('path')


  const express = require('express')
  const morgan = require('morgan')
  const cors = require('cors')
  const debug = require('debug')('server')
  const expressStaticGzip = require('express-static-gzip')
  const argv = require('yargs/yargs')(process.argv).argv

  const webapp = require('./api/src/routes/webapp')
  const { autoSetSecurityHeaders } = require('./api/src/utils/api')
  const db = require('./api/config/database/db')

  const app = express() // Create app

  const publicFolder = join(__dirname, 'client', 'build') // Setup public folder

  const PORT = port || argv.port || process.env.PORT || 8080
  const appName = process.env.APP_NAME || 'NVCTI Server'
  const api = process.env.API_RELATIVE || '/api/v1'

  debug('Booting %s', appName)

  await db.connect()

  app.use(autoSetSecurityHeaders({ contentSecurityPolicy: false })) // Standard security headers
  app.use(cors()) // Standard CORS setup
  app.use(express.json()) // Allow JSON body
  app.use(express.urlencoded({ extended: false })) // Allow urlencoded (GET) body
  app.use('/', express.static(publicFolder)) // Make public folder accessible

  // Prevent interference with mocha's output
  // HTTP request logger
  app.use(morgan('dev'))
  // Google APIs controller - turned off to prevent conflicts
  app.use(`${api}`, require('./api/src/routes/index'))
  app.use('/', expressStaticGzip(publicFolder, {
    enableBrotli: true,
    orderPreference: ['br', 'gz']
  }))
  app.use(webapp)

  await require('./api/src/utils/setup').initial(argv.seedDummy)

  app.listen(PORT, () => debug('Server is running at %s', PORT))
})()
