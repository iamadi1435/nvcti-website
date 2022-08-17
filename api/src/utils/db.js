module.exports = {
  closeConnection: async () => {
    return (await this.instance().close())
  },

  instance: () => {
    return (require('../../config/database/db').sequelize)
  }
}
