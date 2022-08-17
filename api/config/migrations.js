module.exports = {
  "development": {
    "username": process.env.DB_USERNAME || "nvcti",
    "password": process.env.DB_PASSWORD || "password",
    "database": process.env.DB_NAME || "db_nvcti",
    "host": process.env.DB_HOST || "127.0.0.1",
    "dialect": "mysql",
    "port": process.env.DB_PORT || "3307"
  },
  "test": {
    "username": process.env.DB_USERNAME || "nvcti",
    "password": process.env.DB_PASSWORD || "password",
    "database": process.env.DB_NAME || "db_nvcti",
    "host": process.env.DB_HOST || "127.0.0.1",
    "dialect": "mysql",
    "port": process.env.DB_PORT || "3306"
  },
  "production": {
    "username": process.env.DB_USERNAME || 'nvcti',
    "password": process.env.DB_PASSWORD || 'password',
    "database": process.env.DB_NAME || 'db_nvcti',
    "host": process.env.DB_HOST || "127.0.0.1",
    "dialect": "mysql",
    "port": process.env.DB_PORT || 3306
  }
}
