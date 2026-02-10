const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire } = require('../config/env');

const generateAccessToken = (userId) => {
  return jwt.sign(
    { _id: userId },
    jwtSecret,
    { expiresIn: jwtExpire }
  );
};

const generateRefreshToken = (userId) => {
  return jwt.sign(
    { _id: userId },
    jwtSecret,
    { expiresIn: '30d' }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken
};
