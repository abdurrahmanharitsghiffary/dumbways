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
    await queryInterface.createTable("tb_projects", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.DataTypes.UUID,
      },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      start_date: { type: Sequelize.DATE, allowNull: false },
      end_date: { type: Sequelize.DATE, allowNull: false },
      image: { type: Sequelize.STRING, allowNull: false },
      technologies: { type: Sequelize.ARRAY(Sequelize.STRING(20)) },
      user_id: {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: { tableName: "tb_users", name: "User" },
        },
      },
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
    await queryInterface.dropTable("tb_projects");
  },
};
