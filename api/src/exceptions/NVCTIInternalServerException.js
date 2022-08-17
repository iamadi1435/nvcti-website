const BaseException = require('../core/NVCTIBaseException')
const { INTERNAL_SERVER_ERROR } = require('../../config/constants/http.config')

class NVCTIInternalServerException extends BaseException {
  /**
   * Creates an instance of NVCTIInternalServerException.
   * @param {object} { errors, message, name, critical }
   * @memberof NVCTIInternalServerException
   */
  constructor ({ errors, message, name, critical }) {
    super({
      message:
        'This is probably an error on the server' +
          ' and has nothing to do with your request.' ||
        message,
      name: 'Internal server error' || name,
      critical: critical || false,
      errors: errors || [],
      code: INTERNAL_SERVER_ERROR
    })
  }
}

module.exports = NVCTIInternalServerException
