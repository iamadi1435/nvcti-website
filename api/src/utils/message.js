const { readFile } = require('fs')
const { join } = require('path')

const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const NVCTIInternalServerException = require('../exceptions/NVCTIInternalServerException')
const NVCTIResourceNotFoundException = require('../exceptions/NVCTIResourceNotFoundException')
const OAuth2 = google.auth.OAuth2

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.compose'
]

function encodeEmail (to, from, subject, message) {
  const str = [
    'Content-Type: text/html; charset="UTF-8"\n',
    'MIME-Version: 1.0\n',
    'Content-Transfer-Encoding: 7bit\n',
    'to: ',
    to,
    '\n',
    'from: ',
    from,
    '\n',
    'subject: ',
    subject,
    '\n\n',
    message
  ].join('')

  return Buffer.from(str).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
}

const templates = {
  REGISTRATION: { name: 'registration-template', subject: 'Welcome to the NVCTI Family!' },
  FORGOT_PASSWORD: { name: 'forgot-password-template', subject: 'Reset Password' },
  CONTACT_US: { name: 'contact-us-template', subject: 'Contact Request on Website' },
  STATUS_CHANGE: { name: 'status-change-template', subject: 'Application Status Changed' },
  APPLICATION_ACCEPTED: { name: 'application-accepted-template', subject: 'Application Accepted' },
  APPLICATION_REJECTED: { name: 'application-rejected-template', subject: 'Application Rejected' }
}

const getTemplateAddress = function (filename) {
  return join(__dirname, '../..', 'resources/templates', filename + '.html')
}

const replaceVariables = function (str, name, value) {
  const then = Date.now()
  if (typeof str === 'string') {
    let j = 0
    while (j >= 0 && Date.now() - then < 10000) {
      j = str.indexOf('${' + name + '}', j > 0 ? j + 1 : 0)
      if (!(j === -1 || (j > 0 && str[j - 1] === '\\'))) {
        const first = str.substring(0, j)
        const last = str.substring(j + name.length + 3)
        str = first + value + last
      }
    }

    return str
  }
}

const setVariables = function (str, variables) {
  for (const a in variables) {
    // Using regular expression
    // let regex = new RegExp('\\$\\{' + a + '\\}', 'g');
    // str = str.replace(regex, variables[a]);

    // Using stream
    str = replaceVariables(str, a, variables[a])
  }
  return str
}

const getTemplateString = function (name) {
  return new Promise((resolve, reject) => {
    readFile(getTemplateAddress(name), 'utf8', (err, file) => {
      if (err) reject(new NVCTIResourceNotFoundException(err))
      resolve(file)
    })
  })
}

const getMailBody = async function (template, variables) {
  const str = await getTemplateString(template.name)
  return setVariables(str, variables)
}

const getSubject = function (template) {
  return template.subject
}

const sendMessage = async () => {
  const clientId = process.env.CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET
  const refreshToken = process.env.REFRESH_TOKEN
  const email = process.env.EMAIL_ID
  const oauth2Client = new OAuth2(clientId, clientSecret, 'https://developers.google.com/oauthplayground')
  oauth2Client.setCredentials({
    refresh_token: refreshToken
  })
  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject(new NVCTIInternalServerException({ message: 'Email access forbidden' }))
      }
      resolve(token)
    })
  })
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: email,
      clientId,
      clientSecret,
      refreshToken,
      accessToken
    },
    tls: {
      rejectUnauthorized: false
    }
  })
  return smtpTransport
}

const sendMail = async function (template, opts, variables) {
  try {
    opts.html = await getMailBody(template, variables)
    opts.subject = getSubject(template)
    opts.from = opts.from || process.env.APP_NAME +
      '<' + process.env.EMAIL_ID + '>' || process.env.EMAIL_ID
    opts.user = process.env.EMAIL_ID
    opts.replyTo = opts.replyTo || opts.from
    opts.pass = process.env.EMAIL_PASSWORD

    if (opts.to && !(opts.to instanceof Array)) { opts.to = opts.to.split(',') }

    const send = require('gmail-send')(opts)
    return await send()
    // let emailTransproter = await sendMessage();
    // return await emailTransproter.sendMail(opts);
  } catch (err) {
    const errOpts = {
      name: 'Mailing failure',
      message: 'Mailing server error',
      errors: err,
      critical: true
    }

    throw new NVCTIInternalServerException(errOpts)
  }
}
module.exports = {
  sendMessage,
  getMailBody,
  templates,
  getTemplateAddress,
  sendMail
}
