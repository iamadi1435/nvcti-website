module.exports = {
  // Path separator
  separator: '/',
  // Name of the app
  appName: process.env.APP_NAME || 'NVCTI Website',
  // Host
  host: process.env.HOST_URL || 'http://localhost:8080',
  // API relative URL
  apiRelativeUrl: process.env.API_RELATIVE || '/api/v1',
  // API complete URL
  apiUrl: process.env.API_URL || 'http://localhost:8080/api/v1'

}
