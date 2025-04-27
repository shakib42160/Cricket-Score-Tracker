const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Adjust path if needed

class User extends Model {}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
  }
}, {
  sequelize,
  modelName: 'user',
  tableName: 'users',  // Explicit table name
  timestamps: true,
});

module.exports = User;
