'use strict';

const ExternalApplicant = require('../models/ExternalApplicant')
const table = process.env.TABLE_EXTERNAL || 'table_external'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return await queryInterface.createTable(table, ExternalApplicant.attributes, ExternalApplicant.opts)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    return await queryInterface.dropTable(table)

  }
};
