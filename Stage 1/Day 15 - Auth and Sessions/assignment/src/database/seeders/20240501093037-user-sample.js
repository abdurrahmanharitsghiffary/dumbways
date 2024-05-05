"use strict";

const users = require("../../data/userSample.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tb_users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tb_users", null, {});
  },
};
