const BaseException = require('../core/NVCTIBaseException')
const { BAD_REQUEST } = require('../../config/constants/http.config')

class NVCTIValidationException extends BaseException {
  /**
   * Creates an instance of NVCTIValidationException.
   * @param {object} { message, name }
   * @memberof NVCTIValidationException
   */
  constructor ({ message, name, errors }) {
    super({
      message: message || 'Some validation error occurred.',
      name: name || 'Validation error',
      code: BAD_REQUEST,
      errors: errors || []
    })
  }
}

module.exports = NVCTIValidationException
