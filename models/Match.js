const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Match extends Model {}

Match.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    team1_id: {
      type: DataTypes.UUID,
      references: {
        model: 'teams', // ✅ Correct (not 'team')
        key: 'id',
      },
    },
    team2_id: {
      type: DataTypes.UUID,
      references: {
        model: 'teams', // ✅ Correct
        key: 'id',
      },
    },
    tournament_id: {
      type: DataTypes.UUID,
      references: {
        model: 'tournaments', // ✅ Correct
        key: 'id',
      },
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('Scheduled', 'Live', 'Completed'),
      defaultValue: 'Scheduled',
    },
    winner_id: {
      type: DataTypes.UUID,
      references: {
        model: 'teams', // ✅ Correct
        key: 'id',
      },
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'match',
  }
);

module.exports = Match;
