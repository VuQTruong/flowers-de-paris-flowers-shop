require('dotenv').config();
const express = require('express');
const app = express();

const AppError = require('./errors/app-error');
const { errorHandler } = require('./errors/error-handler');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/healthcheck', (req, res) => {
  return res.status(200).json({
    message: 'Ok',
  });
});

// Routes

// Unhandle Routes
app.all('*', (req, res, next) => {
  next(AppError.notFound(`Cannot find ${req.originalUrl} route`));
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
