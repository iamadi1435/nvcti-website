const NVCTIInternalServerException = require('../exceptions/NVCTIInternalServerException')
const NVCTIValidationException = require('../exceptions/NVCTIValidationException')
const NVCTIBadRequestException = require('../exceptions/NVCTIBadRequestException')
const JsonWebTokenError = require('jsonwebtoken/lib/JsonWebTokenError')
const TokenExpiredError = require('jsonwebtoken/lib/TokenExpiredError')
const NVCTIBaseException = require('./NVCTIBaseException')
const { MulterError } = require('multer')
const { NotBeforeError } = require('jsonwebtoken')
const { SequelizeScopeError } = require('sequelize')

/**
 * {
 *   errors: [],
 *   name: string,
 *   thrownBy: string,
 *   critical: boolean
 * }
 * @param {object} E
 * @returns {NVCTIBaseException} exception object
 */
const { ValidationError } = require('sequelize')

function NVCTIBaseExceptionHandler(E) {
  if (!E || !(E instanceof Error)) {
    throw new NVCTIInternalServerException({
      message: "No error supplied.",
      critical: true,
    });
  }

  if (E instanceof ValidationError) {
    return new NVCTIValidationException( {
      message: E.message,
      errors: E.errors
    });
  } else if (E instanceof SequelizeScopeError) {
    return new NVCTIInternalServerException({});
  } else if (E instanceof JsonWebTokenError) {
    if (E instanceof TokenExpiredError)
      return (new NVCTIBadRequestException({
        message: E.message,
        name: "JWT Error",
        thrownBy: "jsonwebtoken",
        critical: true,
        errors: [],
        code: 401,
      }));
    else if (E instanceof NotBeforeError) {
      return (new NVCTIBaseException({
        message: E.message,
        name: "JWT Error",
        thrownBy: "jsonwebtoken",
        critical: true,
        errors: [],
        code: 401,
      }));
    }
  } else if (E instanceof MulterError) {
    return (new NVCTIBaseException({
      name: E.name,
      message: E.message + " with field: " + E.field + ".",
      thrownBy: "multer",
      critical: false,
      errors: [E],
      code: E.code,
    }));
  } else if (E instanceof NVCTIBaseException) {
    return E;
  } else if (E instanceof Error) {
    return (new NVCTIBaseException({
      name: E.name,
      message: E.message,
      errors: [E],
      critical: true,
      thrownBy: E.stack,
    }));
  }
}

module.exports = NVCTIBaseExceptionHandler
