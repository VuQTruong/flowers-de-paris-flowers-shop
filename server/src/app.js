require('dotenv').config();
const express = require('express');
const app = express();

const AppError = require('./errors/app-error');
const { errorHandler } = require('./middlewares/error-handler');

const aboutRouter = require('./routes/about.routes');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/healthcheck', (req, res) => {
  return res.status(200).json({
    message: 'ok',
  });
});

// Routes
app.use('/api/v1/about', aboutRouter);

// Unhandle Routes
app.all('*', (req, res, next) => {
  next(AppError.notFound(`Cannot find ${req.originalUrl} route`));
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
