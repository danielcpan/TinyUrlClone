/* eslint no-console: 0 */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('../server/routes/index.route');
const APIError = require('./utils/APIError.utils');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Force close connection, sometimes it persists
// db.sequelize.close()

// if (process.env.NODE_ENV === 'development') {
// Sync the database models
// const models = require('./models');
// models.sequelize.sync({
//   force: true,
// });

// const { createTestData } = require('./seeders/testData');
// createTestData()

// app.use(express.static(path.resolve(__dirname, '../client/build')));

// Mount all routes on /api path
app.use('/api', routes);

// If error is not an instanceOf APIError, convert it.
// app.use((err, req, res, next) => {
//   if (err instanceof Sequelize.ValidationError) {
//     const unifiedErrorMessage = err.errors.map(error => error.message).join(', ');
//     const error = new APIError(unifiedErrorMessage, err.status, true);
//     return next(error);
//   } if (!(err instanceof APIError)) {
//     const apiError = new APIError(err.message, err.status);
//     return next(apiError);
//   }
//   return next(err);
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

// Catch 404 and forward to Error Handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// Error Handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500).json({
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
});

// Mongoose Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/tiny_url_clone_development', { useNewUrlParser: true })
.catch(error => console.log(error));

mongoose.connection.on('error', err => {
  console.log(err);
});

module.exports = app;
