const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Player extends Model {}

Player.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    team_id: {
      type: DataTypes.UUID,
      references: {
        model: 'teams', // ✅ fixed: table name must be plural
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'player',
  }
);

module.exports = Player;
