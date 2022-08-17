const mongoose = require('mongoose')
const bruteForceSchema = require('express-brute-mongoose/dist/schema')

module.exports = mongoose.model('bruteforce', bruteForceSchema)
