const BaseException = require('../core/NVCTIBaseException')
const { UNAUTHORIZED } = require('../../config/constants/http.config')

class NVCTIUnauthorisedException extends BaseException {
  /**
   * Creates an instance of KYIUnauthorizedException.
   * @param {object} { message, name, thrownBy, critical }
   * @memberof NVCTIUnauthorizedException
   */
  constructor ({ message, name, thrownBy, critical }) {
    super({
      message: message || 'This user is unauthorised to access this route',
      code: UNAUTHORIZED,
      thrownBy: thrownBy || 'Authentication handler',
      critical: critical || true,
      name: name || 'Authentication error'
    })
  }
}

module.exports = NVCTIUnauthorisedException
