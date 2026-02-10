const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // MySQL Configuration
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'epic_consulation',
  DB_PORT: process.env.DB_PORT || 3306,

  // JWT Configuration
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret-key',
  jwtExpire: process.env.JWT_EXPIRE || '7d',

  // Frontend URL
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
};
