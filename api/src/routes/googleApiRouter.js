const express = require('express')
const googleApiRouter = express.Router()
const { google } = require('googleapis')

const scopes = 'https://www.googleapis.com/auth/spreadsheets.readonly'
const jwt = new google.auth.JWT(
  process.env.GOOGLEAPI_CLIENT_EMAIL,
  null,
  process.env.GOOGLEAPI_PRIVATE_KEY.replace(/\\n/g, '\n'),
  scopes
)

jwt.authorize((err, response) => {
  if (err) { console.error(err) }
  if (response) {
    console.log(response)
    console.log('----------------------------')
  }
  googleApiRouter.route('/test')
    .get((req, res, next) => {
      google.sheets('v4').spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEETID,
        range: process.env.SPREADSHEETRANGES,
        majorDimension: 'COLUMNS',
        auth: jwt
      }, (err, result) => {
        console.log(err, result)
        res.send({ success: result })
      })
    })
})

module.exports = googleApiRouter
