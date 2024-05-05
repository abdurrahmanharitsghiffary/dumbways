"use strict";

const projects = require("../../data/sample.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tb_projects", projects, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tb_projects", null, {});
  },
};
