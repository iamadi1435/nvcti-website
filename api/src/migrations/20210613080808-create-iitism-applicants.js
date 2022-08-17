'use strict';

const IITISMApplicant = require('../models/IITISMApplicant')
const table = process.env.TABLE_IITISM || 'table_iitism'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return await queryInterface.createTable(table, IITISMApplicant.attributes, IITISMApplicant.opts)
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
