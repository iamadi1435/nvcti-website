const gmail = require('gmail-send')
const nodemailer = require('nodemailer')
const Template = require('./Template')
const NVCTIInternalServerException = require('../exceptions/NVCTIInternalServerException')

async function getMailParts (opts, template, variables, provider) {
  opts.html = await template.getBody(variables) || 'NVCTI attempted to deliver a message but failed :('
  opts.subject = template.getSubject() || ' Failed delivery of message'
  const email = provider && provider === 'gmail' ? process.env.GMAIL_ID : process.env.SMTP_EMAIL_ID
  opts.from = opts.from || process.env.APP_NAME + '<' + email + '>' || process.env.email
  opts.user = process.env.SMTP_EMAIL_ID
  opts.replyTo = opts.replyTo || opts.from
  if (provider === 'gmail') { opts.pass = process.env.GMAIL_PASSWORD }
  if (opts.to && !(opts.to instanceof Array)) { opts.to = opts.to.split(',') }

  return opts
}

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.live.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_EMAIL_ID || 'j.mihir19.mj@outlook.com',
    pass: process.env.SMTP_PASSWORD
  }
})

const send = async function (template, opts, variables) {
  if (!(template instanceof Template)) { throw new NVCTIInternalServerException({ message: 'Invalid template' }) }
  try {
    if (process.env.MAILER_MODULE === 'gmail') {
      opts = await getMailParts(opts, template, variables, 'gmail')
      const send = gmail(opts)
      return await send()
    } else {
      opts = await getMailParts(opts, template, variables)
      return await transport.sendMail(opts)
    }
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

module.exports = send
