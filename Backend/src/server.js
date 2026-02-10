const app = require('./app');
const connectDB = require('./config/db');
const { port } = require('./config/env');

// Connect to database
connectDB();

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
