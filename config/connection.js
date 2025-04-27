// config/connection.js
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  // For production if hosted on Render, Heroku, etc.
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  // Local development
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
      port: 5432
    }
  );
}

module.exports = sequelize;
