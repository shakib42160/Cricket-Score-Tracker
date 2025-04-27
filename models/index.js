const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
  }
);

// Import your models
const User = require('./User');
const Team = require('./Team');
const Player = require('./Player');
const Match = require('./Match');
const Score = require('./Score');
const Tournament = require('./Tournament');

// Setup associations (if any)
Team.hasMany(Player, { foreignKey: 'team_id', onDelete: 'CASCADE' });
Player.belongsTo(Team, { foreignKey: 'team_id' });

Team.hasMany(Match, { foreignKey: 'team1_id', onDelete: 'CASCADE' });
Team.hasMany(Match, { foreignKey: 'team2_id', onDelete: 'CASCADE' });
Match.belongsTo(Team, { foreignKey: 'team1_id' });
Match.belongsTo(Team, { foreignKey: 'team2_id' });

Tournament.hasMany(Match, { foreignKey: 'tournament_id' });
Match.belongsTo(Tournament, { foreignKey: 'tournament_id' });

Match.hasMany(Score, { foreignKey: 'match_id' });
Score.belongsTo(Match, { foreignKey: 'match_id' });

Player.hasMany(Score, { foreignKey: 'player_id' });
Score.belongsTo(Player, { foreignKey: 'player_id' });

module.exports = {
  sequelize,
  User,
  Team,
  Player,
  Match,
  Score,
  Tournament,
};
