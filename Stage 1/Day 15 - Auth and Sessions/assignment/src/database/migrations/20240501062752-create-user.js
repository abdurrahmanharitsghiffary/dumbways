"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tb_users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING(128), allowNull: false },
      username: { type: Sequelize.STRING(150), allowNull: false, unique: true },
      first_name: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      last_name: { type: Sequelize.STRING(150), allowNull: true },
      bio: { type: Sequelize.TEXT },
      picture: { type: Sequelize.TEXT },
      // role: {
      //   type: Sequelize.ENUM("owner", "admin", "user"),
      //   defaultValue: "user",
      // },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tb_users");
  },
};
