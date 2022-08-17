const Template = require('./Template')

const templates = {
  REGISTRATION: new Template({ name: 'registration-template', subject: 'Welcome to the NVCTI Family!' }),
  FORGOT_PASSWORD: new Template({ name: 'forgot-password-template', subject: 'Reset Password' }),
  CONTACT_US: new Template({ name: 'contact-us-template', subject: 'Contact Request on Website' }),
  STATUS_CHANGE: new Template({ name: 'status-change-template', subject: 'Application Status Changed' }),
  APPLICATION_ACCEPTED: new Template({ name: 'application-accepted-template', subject: 'Application Accepted' }),
  APPLICATION_REJECTED: new Template({ name: 'application-rejected-template', subject: 'Application Rejected' })
}

module.exports = templates
