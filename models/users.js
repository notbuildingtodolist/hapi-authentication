const { DataTypes } = require("sequelize");

const { sequelize, constants: { DatabaseTables } } = require("../config");

const User = sequelize.define(DatabaseTables.User, {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  is_verified: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  createdAt: { type: DataTypes.DATE, allowNull: true },
  updatedAt: { type: DataTypes.DATE, allowNull: true },
  deletedAt: { type: DataTypes.DATE, allowNull: true },
});

module.exports = User;
