const app = require('./app');
const { connectDB } = require('./config/mysql');
const createTables = require('./config/initDB');
const { port } = require('./config/env');

// Connect to database and initialize tables
(async () => {
  await connectDB();
  await createTables();
})();

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
