require('dotenv').config();
const app = require('./app');

const sequelize = require('./config/database');

require('./models/index.js');

sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
  });
}).catch((err) => {
  console.error("Failed to sync database:", err.message);
  process.exit(1);
});