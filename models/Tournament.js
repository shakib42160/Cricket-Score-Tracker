const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tournament extends Model {}

Tournament.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'tournament',
  }
);

module.exports = Tournament;
