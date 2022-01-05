require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const AppError = require('./errors/app-error');
const { errorHandler } = require('./middlewares/error-handler');

const aboutRouter = require('./services/about');
const authRouter = require('./services/auth');
const userRouter = require('./services/user');

const app = express();

// Pass the global passport object into the configuration function
require('./config/passport')(passport);

/* Middlewares */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

/* Health Check */
app.get('/healthcheck', (req, res) => {
  return res.status(200).json({
    message: 'ok',
  });
});

/* Routes */
app.use('/api/about', aboutRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

/* Unhandle Routes */
app.all('*', (req, res, next) => {
  next(AppError.notFound(`Cannot find ${req.originalUrl} route`));
});

/* Global Error Handler */
app.use(errorHandler);

module.exports = app;
