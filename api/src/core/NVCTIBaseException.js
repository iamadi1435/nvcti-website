/**
 *
 * @class NVCTIBaseException
 * @extends {Error}
 */
class NVCTIBaseException extends global.Error {
  name = "Base exception";
  errors = [];
  thrownBy = process.env.APP_NAME || "NVCTI Server";
  critical = false;
  // message = messageFormatter("No message provided")
  message = "No message provided";
  code = 500;

  /**
   * Creates an instance of NVCTIBaseException.
   * @param {object} { name: string, errors: array<object>, thrownBy: string,
   * critical: boolean, message: string, code: number }
   * @memberof NVCTIBaseException
   */
  constructor({ name, errors, thrownBy, critical, message, code }) {
    super();
    if (critical) this.critical = critical;
    if (thrownBy) this.thrownBy = thrownBy;
    if (errors) this.errors = errors;
    if (name) this.name = name;
    if (message) this.message = message;
    if (code) this.code = code;
  }
}

module.exports = NVCTIBaseException
