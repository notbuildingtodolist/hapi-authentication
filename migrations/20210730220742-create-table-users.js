'use strict';

const { constants: { DataTypes, DatabaseTables } } = require("../config");

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable(DatabaseTables.User, {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING, notNull: true },
    last_name: { type: DataTypes.STRING, notNull: false },
    email: { type: DataTypes.STRING, notNull: true },
    password: { type: DataTypes.STRING, notNull: true },
    is_verified: { type: DataTypes.BOOLEAN, notNull: false, default: false },
    createdAt: { type: DataTypes.DATE, notNull: false },
    updatedAt: { type: DataTypes.DATE, notNull: false },
    deletedAt: { type: DataTypes.DATE, notNull: false },
  });
};

exports.down = function(db) {
  return db.dropTable(DatabaseTables.User);
};

exports._meta = {
  "version": 1
};
