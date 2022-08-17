/* eslint-disable no-ex-assign */
const send = require('../mail/mailer')
const { CONTACT_US } = require('../mail/templates')
const NVCTIBadRequestException = require('../exceptions/NVCTIBadRequestException')
const NVCTIBaseExceptionHandler = require('../core/NVCTIBaseExceptionHandler')
const { isNotProfane } = require('../utils/validator')

module.exports = {
  sendMessage: async (req, res) => {
    try {
      if (isNotProfane(req.body.message)) {
        await send(
          CONTACT_US,
          {
            to: process.env.CONTACT_MAIL
          },
          {
            email: req.body.email,
            name: req.body.name,
            message: req.body.message
          }
        )
        res.json({
          success: true,
          from: req.body.email
        })
      }
    } catch (e) {
      e = NVCTIBaseExceptionHandler(e)
      res.status(e.code).json(e)
    }
  },

  // resend email controller
  resendMail: async function (req, res) {
    // check who to send
    // check what to send
  }
}
