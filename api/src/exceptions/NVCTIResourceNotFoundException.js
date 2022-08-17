const BaseException = require('../core/NVCTIBaseException')
const { NOT_FOUND } = require('../../config/constants/http.config')

class NVCTIResourceNotFoundException extends BaseException {
  /**
   * Creates an instance of NVCTIResourceNotFoundException.
   * @param {string} resourceName
   * @memberof NVCTIResourceNotFoundException
   */
  constructor (resourceName) {
    super({
      message: 'The requested resource ' + resourceName + ' was not found.',
      code: NOT_FOUND,
      name: 'Resource not found',
      critical: false
    })
  }
}

module.exports = NVCTIResourceNotFoundException
