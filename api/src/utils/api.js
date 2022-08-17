const MongooseStore = require('express-brute-mongoose')
const SequelizeStore = require('express-brute-sequelize')
const { instance } = require('./db')

const NVCTIInternalServerException = require('../exceptions/NVCTIInternalServerException')
const NVCTIBaseExceptionHandler = require('../core/NVCTIBaseExceptionHandler')

/**
   * Sets the request timeout in express for local environments
   * Won't be useful on platforms with fixed timeouts like Heroku,
   * but the route will keep working
   *
   * Middleware
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
const reqTimeout = function (req, res, next) {
  req.setTimeout(parseInt(process.env.REQUEST_TIMEOUT || 30, 10) * 60 * 1000)
  next()
}

// middleware for setting cookies
// re === true for request
// re === false for response
const setHeader = function (re, key, value) {
  if (re) {
    re.set(key, value)
  }
}

const autoSetSecurityHeaders = function () {
  return (require('helmet')(...arguments))
}

const bruteforceInstance = function (store, retries) {
  const ExpressBrute = require('express-brute')
  if (store instanceof MongooseStore || store instanceof SequelizeStore) {
    const opts = {
      freeRetries: retries || 6,
      handleStoreError: NVCTIBaseExceptionHandler
    }
    return (new ExpressBrute(store, opts))
  }
}

const bruteforceMongoose = function () {
  const Bruteforce = require('../models/Bruteforce.mongo')
  const store = new MongooseStore(Bruteforce)
  return bruteforceInstance(store)
}

const bruteforce = function (retries) {
  const store = new SequelizeStore(instance(),
    process.env.BRUTEFORCE_TABLE || 'TABLE_BRUTEFORCE',
    { logging: false },
    function () {})
  return bruteforceInstance(store, retries)
}

const generateResponse = function (a) {
  if (a instanceof Array) {
    return {
      _count: a.length,
      records: a,
      _timestamp: Date.now()
    }
  } else {
    return {
      _timestamp: Date.now(),
      record: a
    }
  }
}

// Of the form 'name,email,dob'
const generateSelectionList = function (s = '') {
  if (typeof s === 'string') { return s.split(',') } else {
    throw new NVCTIInternalServerException(
      'Select string not properly formatted')
  }
}

// Of the form 'name,DESC'
const generateOrderList = function (s = '') {
  if (typeof s === 'string') { return s.split(',') } else {
    throw new NVCTIInternalServerException(
      'Order string not properly formatted')
  }
}

const generateQueryObject = function (q) {
  const {
    Op
  } = require('sequelize')

  const andArray = []
  const opts = {
    where: {
      [Op.and]: andArray
    }
  }

  if (!!q.select && typeof (q.select) === 'string') {
    opts.attributes = generateSelectionList(q.select)
    delete q.select
  }
  if (!!q.limit && typeof (q.limit) === 'string' && q.limit.length > 0) {
    q.limit = parseInt(q.limit) || null
    opts.limit = q.limit
    delete q.limit
  }
  if (!!q.offset && typeof (q.offset) === 'string' && q.offset.length > 0) {
    q.offset = parseInt(q.offset) || null
    opts.offset = q.offset
    delete q.offset
  }
  if (q.order) {
    opts.order = [generateOrderList(q.order)]
    delete opts.order
  }
  for (const z in q) {
    // There should be some sort of validation here
    const x = {}
    x[opts.where[z]] = parseInt(q[z]) || q[z]
    andArray.push(x)
  }
  return opts
}

// function to set basic headers
// automatically like
// Content-Type
// Content-Length
// X-Requested-By, and all other X- headers
// X-Issuer header also, maybe?
// this function will take in the response
// object

// middleware for HATEOAS

module.exports = {
  reqTimeout,
  setHeader,
  autoSetSecurityHeaders,
  generateOrderList,
  generateSelectionList,
  generateQueryObject,
  generateResponse,
  bruteforceInstance,
  bruteforceMongoose,
  bruteforce
}
