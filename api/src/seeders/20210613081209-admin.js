'use strict';

const { hash } = require('../utils/auth')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    queryInterface.insert(process.env.TABLE_IITISM || 'table_iitism', {
      email: process.env.ADMIN_EMAIL || 'nvcti@iitism.ac.in',
      password: hash(process.env.ADMIN_PASSWORD || 'password'),
      admissionNumber: '00XX0000',
      name: 'Administrator',
      isAdmin: 1,
      verified: 1
    })

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
