require("dotenv").config();

module.exports = {

  "Environment": {
    "PORT": process.env.PORT,
    "HOST": process.env.HOST,
    "DB_NAME": process.env.DB_NAME,
    "DB_USER": process.env.DB_USER,
    "DB_PORT": process.env.DB_PORT,
    "DB_HOST": process.env.DB_HOST,
    "DB_PASSWORD": process.env.DB_PASSWORD,
    "DB_DIALECT": process.env.DB_DIALECT,
    "JWT_SECRET": process.env.JWT_SECRET,
    "NODEMAILER_USER": process.env.NODEMAILER_USER,
    "NODEMAILER_PASSWORD": process.env.NODEMAILER_PASSWORD,
  },

  "DataTypes": {
    CHAR: 'char',
    STRING: 'string',
    TEXT: 'text',
    SMALLINT: 'smallint',
    BIGINT: 'bigint',
    INTEGER: 'int',
    SMALL_INTEGER: 'smallint',
    BIG_INTEGER: 'bigint',
    REAL: 'real',
    DATE: 'date',
    DATE_TIME: 'datetime',
    TIME: 'time',
    BLOB: 'blob',
    TIMESTAMP: 'timestamp',
    BINARY: 'binary',
    BOOLEAN: 'boolean',
    DECIMAL: 'decimal'
  },

  "DatabaseTables": { 
    "User": "users",
    "UserVerification": "user_verifications",
  },

};
