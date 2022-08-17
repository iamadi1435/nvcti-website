module.exports = {
  // User given access to the db
  user: process.env.DB_USERNAME || 'nvcti',
  // Password of the same user
  password: process.env.DB_PASSWORD || 'password',
  // Name of the database
  name: process.env.DB_NAME || 'nvcti',

  options: {
    // Where the db is hosted
    host: process.env.DB_HOST || 'localhost',
    // Dialect to generate queries in
    dialect: process.env.SEQUELIZE_DIALECT || 'mysql',
    // Database connection pool
    pool: {
      // Maximum connections that can be maintained at a time
      max: parseInt(process.env.SEQUELIZE_POOL_MAX) || 5,
      // Minimum connections that can be maintained at a time
      min: parseInt(process.env.SEQUELIZE_POOL_MIN) || 0,
      // Maximum time to wait until a connection to db can be acquired
      acquire: parseInt(process.env.SEQUELIZE_POOL_ACQUIRE) || 30000,
      // Maximum time a connection can stay idle before getting released
      idle: parseInt(process.env.SEQUELIZE_POOL_IDLE) || 10000

    },
    logging: (...msg) => {
      // if (process.env.NODE_ENV === 'development') {
      // const debug = require('debug')('mysql');
      // debug(msg[0]);
      //     return debug;
      // } else
      return false
    },
    // database port
    port: process.env.DB_PORT || 3306
  },
  // Host of MySQL
  host: process.env.DB_HOST || 'localhost',
  // IIT (ISM) table
  tableIITISM: process.env.TABLE_IITISM || 'TABLE_IITISM',
  // External table
  tableExternal: process.env.TABLE_EXTERNAL || 'TABLE_EXTERNAL',
  // Application table
  tableApplication: process.env.TABLE_APPLICATION || 'TABLE_APPLICATION',
  // Bruteforce table
  tableBruteforce: process.env.TABLE_BRUTEFORCE || 'TABLE_BRUTEFORCE'
}
