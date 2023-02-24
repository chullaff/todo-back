const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("..");

class ToDo extends Sequelize.Model {}

ToDo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      // defaultValue: "Title",
    },
    description: {
      type: DataTypes.STRING,
      // defaultValue: "",
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "ToDo",
  }
);

module.exports = ToDo;
