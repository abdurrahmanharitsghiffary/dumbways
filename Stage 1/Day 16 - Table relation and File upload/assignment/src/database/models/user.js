"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Project, User }) {
      // define association here
      User.hasMany(Project);
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING(128), allowNull: false },
      username: { type: DataTypes.STRING(150), allowNull: false, unique: true },
      firstName: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      lastName: { type: DataTypes.STRING(150), allowNull: true },
      bio: { type: DataTypes.TEXT },
      picture: { type: DataTypes.TEXT },
      // role: {
      //   type: DataTypes.ENUM("owner", "admin", "user"),
      //   defaultValue: "user",
      // },
    },
    {
      sequelize,
      underscored: true,
      tableName: "tb_users",
      modelName: "User",
    }
  );
  return User;
};
