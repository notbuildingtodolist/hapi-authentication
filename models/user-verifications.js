const { DataTypes } = require("sequelize");
const { sequelize, constants: { DatabaseTables } } = require("../config");

const User = require("./users");

const UserVerification = sequelize.define(DatabaseTables.UserVerification, {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.BIGINT, allowNull: false },
  otp: { type: DataTypes.INTEGER, allowNull: false },
  is_revoked: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  createdAt: { type: DataTypes.DATE, allowNull: true },
  updatedAt: { type: DataTypes.DATE, allowNull: true },
  deletedAt: { type: DataTypes.DATE, allowNull: true },
});

// Model relations
UserVerification.belongsTo(User, { foreignKey: 'user_id' });

module.exports = UserVerification;
