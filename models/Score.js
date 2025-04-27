const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Score extends Model {}

Score.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    match_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'matches', // ✅ CORRECTED
        key: 'id',
      },
    },
    player_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'players', // ✅ CORRECTED
        key: 'id',
      },
    },
    runs: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    wickets: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'score',
  }
);

module.exports = Score;
