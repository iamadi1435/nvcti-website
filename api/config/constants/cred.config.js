module.exports = {
  // Administrator account email
  adminEmail: process.env.ADMIN_EMAIL || 'nvcti@iitism.ac.in',
  // Administrator account password
  adminPassword: process.env.ADMIN_PASSWORD || 'password',
  // Minimum length of password
  minPasswordLength: process.env.PASSWORD_MIN_LENGTH || 6,
  // Minimum number of numbers of password
  minNumsInPassword: process.env.PASSWORD_MIN_NUMBERS || 0,
  // Minimum number of upper case characters in password
  minUpperCaseInPassword: process.env.PASSWORD_MIN_UPPERCASE || 0,
  // Minimum number of lower case characters in password
  minLowerCaseInPassword: process.env.PASSWORD_MIN_LOWERCASE || 0
}
