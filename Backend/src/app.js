const express = require('express');
const sequelize = require('./config/database');


const app = express();
app.use(express.json());


module.exports = app;
