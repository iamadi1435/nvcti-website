const fs = require('fs')
const debug = require('debug')
const NVCTIInternalServerException = require('../exceptions/NVCTIInternalServerException')
const NVCTIBaseExceptionHandler = require('../core/NVCTIBaseExceptionHandler')
const debugTools = debug('tools')

module.exports = {

  //
  timeToTime: (num, a, b) => {
    num = parseInt(num, 10)
    switch (a) {
      case 'hours':
        num *= 3600
        break
      case 'minutes':
        num *= 60
        break
      case 'days':
        num *= 3600 * 24
        break
      case 'weeks':
        num *= 3600 * 24 * 7
        break
    }
    switch (b) {
      case 'hours':
        num /= 3600
        break
      case 'minutes':
        num /= 60
        break
      case 'days':
        num /= 3600 * 24
        break
      case 'weeks':
        num /= 3600 * 24 * 7
        break
    }

    return num
  },

  // date and time manipulation, this will take maybe 3-4 functions
  // - getMonthYearDateDay

  /**
   * For generating delays using promises
   *
   * @param {number} ms time in milliseconds
   * @returns {Promise<void>}
   */
  delay: function (ms) {
    debugTools('Waiting ' + ms / 1000 + ' seconds.')
    return new Promise((resolve) => setTimeout(resolve, ms))
  },

  /**
   * Converts a binary string to base64 string
   * Equivalent to btoa()
   *
   * @param {string} binaryString
   * @returns {string} Base64 string
   */
  toBase64: function (binaryString) {
    const buff = Buffer.from(binaryString)
    return buff.toString('base64')
  },

  /**
   * Converts a base64 string to binary string
   * Equivalent to atob()
   *
   * @param {string} base64String
   * @returns {string} Binary string
   */
  toBinary: function (base64String) {
    const buff = Buffer.from(base64String, 'base64')
    return buff.toString('ascii')
  },

  // toggle debugging dynamically
  toggleDebugging: (switc = 'off', options = []) => {
    if (switc === 'off') {
      debugTools('Turning off debugger')
      debug.disable()
    } else {
      debugTools('Turning on debugger for ' + options.join(', ') + '.')
      debug.enable(...options)
    }
  },

  /**
   * Validates supplied imaged buffer by resizing image to
   * 700px * 700px. This function uses Sharp Module for validation.
   *
   * @param {string} path of image
   * @returns {Promise<string>} The path that was originally supplied
   */
  compressImage: async function (original) {
    let opts = { quality: 60 }
    const sharp = require('sharp')
    return new Promise(async (resolve, reject) => {
      debug("Compressing:", original);
      buffer = await sharp(original)
      .resize({
        width: 800,
        height: 800
      })
      // .jpg(opts)
      .toBuffer(function(err, buffer) {
        if (err)
          reject(err)
        fs.writeFile(original, buffer, function(e) {
          if (e)
            reject(new NVCTIInternalServerException({
              message: e.message,
              errors: [e]
            }));
          resolve(original);
        })
      })
    });
  },

  profanity: function (str, action = 'clean') {
    const filter = new (require('bad-words'))()
    if (!!str && str instanceof Array) str = str.map((s) => filter[action](s))
    else if (!!str && typeof str === 'string') str = filter[action](str)
    else {
      throw NVCTIBaseExceptionHandler(
        new NVCTIInternalServerException({
          message: 'Incompatible type supplied',
          critical: false
        })
      )
    }
    return str
  }

  // Include param

  // Filter param

  // URL encoding

  // XSS safety tools

  // trimming and stuff
}
