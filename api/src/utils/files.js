const path = require('path')
const multer = require('multer')
const debug = require('debug')('files')
const fs = require('fs')

const NVCTIInternalServerException = require('../exceptions/NVCTIInternalServerException')

// The allowed* objects are mostly dummies dependent upon
// future action
const allowedFormats = {
  documents: ['pdf', 'docx', 'doc'],
  images: ['jpeg', 'jpg', 'png', 'gif', 'tiff'],
  videos: ['mp4', 'mkv', 'avi', 'wmv', 'webm'],
  spreadsheets: ['xlsx', 'xls']
}

const directoryNames = {
  documents: 'documents',
  signatures: 'signatures',
  avatars: 'avatars',
  spreadsheets: 'spreadsheets',
  supporting: 'supporting'
}

const storageLimits = {
  images: { fileSize: 524288000 }, // 5 MB in bytes
  documents: { fileSize: 524288000 },
  videos: { fileSize: 524288000 }
}

const filenameGenerator = function (file) {
  const uniqueSuffix =
        Date.now() +
        '-' +
        Math.round(Math.random() * 1E9)
  return file.fieldname +
        '-' +
        uniqueSuffix + '.' +
        file.originalname.split('.')[file.originalname.split('.').length-1]
}

const fileStorage = (fileType) => {
  return multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, path.join(__dirname, '../..', 'uploads', fileType))
    },
    filename: function (req, file, cb) {
      const filePath = filenameGenerator(file)
      req.filePath = path.join(__dirname, '../..', 'uploads', fileType, filePath)
      req.relativeFilePath = path.join('uploads', fileType, filePath)
      cb(null, filePath)
    }
  })
}

const fileFilter = (fileType) => {
  return function (_req, file, callback) {
    debug(file)
    if (true || file.mimetype === 'application/octet-stream') {
      // more validation required here
      debug(file)
      callback(null, true)
    } else {
      callback(null, false)
      debug(
        'Only ' + allowedFormats[fileType].join(', ') + ' types are allowed!')
    }
  }
}
/**
   * Deletes the file at the provided path
   *
   * @param {string} filePath
   * @returns {Promise<void>}
   */
const deleteFile = function (filePath) {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.F_OK, err => {
      if (err) resolve()
      else {
        fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err)
          reject(err)
        }
        resolve()
      })
      }
    })
  })
}

const readFile = function (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, buffer) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      resolve(buffer)
    })
  })
}

module.exports = {
  // create and write to file
  // read file
  readFile,

  // overwrite a file
  // append to a file
  // create and write to many files

  // delete file
  deleteFile,

  /**
     * Deletes all files at the provided paths
     *
     * @param {Array<string>} filePaths
     * @returns {Promise<Array<string>} Array of paths deleted
     */
  deleteManyFiles: function (filePaths) {
    return new Promise(async (resolve, reject) => {
      if (!filePaths) {
        reject(
          new NVCTIInternalServerException({ message: 'No or invalid paths supplied.' }))
      } else {
        for (let i = 0; i < filePaths.length; i++) {
          await deleteFile(filePaths[i])
        }
        resolve(filePaths)
      }
    })
  },

  storageLimits,

  allowedFormats,

  directoryNames,

  fileFilter,

  fileStorage,

  filenameGenerator,

  /**
   * Returns a Multer instance that provides several methods for generating
   * middleware that process files uploaded in `multipart/form-data` format.
   *
   * The `StorageEngine` specified in `storage` will be used to store files. If
   * `storage` is not set and `dest` is, files will be stored in `dest` on the
   * local file system with random names. If neither are set, files will be stored
   * in memory.
   *
   * In addition to files, all generated middleware process all text fields in
   * the request. For each non-file field, the `Request.body` object will be
   * populated with an entry mapping the field name to its string value, or array
   * of string values if multiple fields share the same name.
   *
   *
   * @returns {Multer} multer instance
   */
  multerConfig: function () {
    return multer(...arguments)
  }
}
