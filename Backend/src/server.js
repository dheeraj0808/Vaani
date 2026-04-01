const app = require('./app');
const sequelize = require('./config/database');
require('dotenv').config();

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    app.listen(process.env.PORT, () => {
      console.log('Server is running on port', process.env.PORT);
    });
  }
  catch (error) {
    console.log('Database connection failed:', error);
  }
};

startServer();  