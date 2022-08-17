const BaseException = require('../core/NVCTIBaseException')
const { BAD_REQUEST } = require('../../config/constants/http.config')

class NVCTIBadRequestException extends BaseException {
  /**
   * Creates an instance of NVCTIBadRequestException.
   * @param {object} { errors, message, name, critical }
   * @memberof NVCTIBadRequestException
   */
  constructor ({ errors, message, name, critical }) {
    super({
      message: message || 'Bad request exception',
      errors: errors || [],
      name: name || 'Bad request',
      critical: critical || true,
      code: BAD_REQUEST
    })
  }
}

module.exports = NVCTIBadRequestException
