"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Project, User }) {
      // define association here
      Project.belongsTo(User);
    }
  }
  Project.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
      startDate: { type: DataTypes.DATE, allowNull: false },
      endDate: { type: DataTypes.DATE, allowNull: false },
      image: { type: DataTypes.STRING, allowNull: false },
      technologies: { type: DataTypes.ARRAY(DataTypes.STRING(20)) },
    },
    {
      sequelize,
      timestamps: true,
      underscored: true,
      tableName: "tb_projects",
      modelName: "Project",
    }
  );
  return Project;
};
