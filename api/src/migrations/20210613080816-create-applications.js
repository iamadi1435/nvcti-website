'use strict';

const Application = require('../models/Application')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable(
      process.env.TABLE_APPLICATION || 'table_application', Application.attributes, Application.opts)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    return await queryInterface.dropTable(process.env.TABLE_APPLICATION || 'table_application')
  }
};
