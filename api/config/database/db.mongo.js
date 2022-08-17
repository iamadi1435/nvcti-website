const mongoose = require('mongoose')
const debug = require('debug')('database')

const dbHost = 'mongodb://127.0.01:27017/'
const dbName = 'nvcti'
const dbUrlDev = dbHost + dbName

try {
  debug('Connecting to mongodb...')
  mongoose.connect(process.env.MONGOURL || dbUrlDev,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => debug(
      'Connected to mongodb %s', process.env.MONGOURL ? 'atlas' : 'local'))
} catch (e) {
  debug('Database connection error:', e)
}

module.exports = mongoose
