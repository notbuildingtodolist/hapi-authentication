const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { constants: { Environment: { JWT_SECRET } } } = require("../config");

const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000); 
};

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
}

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '5d',
  })
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (ex) {
    throw new Error(ex.message);
  }
}

module.exports = {
  generateToken,
  hashPassword,
  comparePassword,
  generateOtp,
  verifyToken,
};
