/* eslint-disable no-ex-assign */
const auth = require('../utils/auth')
const jwt = require('jsonwebtoken')
const NVCTIBadRequestException = require('../exceptions/NVCTIBadRequestException')
const NVCTIBaseExceptionHandler = require('../core/NVCTIBaseExceptionHandler')

module.exports = {
  confirmEmail: async (req, res) => {
    try {
      const token = req.query.token
      if (!token) throw new NVCTIBadRequestException({ message: 'Token not supplied' })
      const decoded = jwt.verify(token, process.env.EMAIL_CODE_SECRET)
      const email = decoded.ema
      const type = decoded.typ
      const userType = auth.queryMapping[type]
      await userType.update(
        { verified: true, emailCode: null },
        { where: { email } }
      )
      res.redirect('/register')
    } catch (err) {
      err = NVCTIBaseExceptionHandler(err)
      res.status(err.code).json(err)
    }
  },

  confirmReset: async (req, res) => {
    try {
      const token = req.query.token
      const newPassword = req.body.newPassword

      if (!token || !newPassword) {
        throw new NVCTIBadRequestException({
          message: 'Token or new password not supplied'
        })
      }

      const decoded = jwt.verify(token, process.env.PASSWORD_RESET_SECRET)
      const userType = auth.queryMapping[decoded.typ]
      const email = decoded.ema
      await userType.update(
        { passwordResetToken: null, password: (await auth.hash(newPassword)) },
        { where: { email } }
      )

      res.redirect('/login')
    } catch (err) {
      err = NVCTIBaseExceptionHandler(err)
      res.status(err.code).json(err)
    }
  }
}
