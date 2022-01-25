require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const AppError = require('./errors/app-error');
const { errorHandler } = require('./middlewares/error-handler');

const aboutRouter = require('./services/about');
const authRouter = require('./services/auth');
const categoryRouter = require('./services/category');
const contactRouter = require('./services/contact');
const userRouter = require('./services/user');

const app = express();

// Pass the global passport object into the configuration function
require('./config/passport')(passport);

/* Middlewares */
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

/* Health Check */
app.get('/healthcheck', (req, res) => {
  return res.status(200).json({
    message: 'ok',
  });
});

/* Routes */
app.use('/api/about', aboutRouter);
app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);
app.use('/api/contact', contactRouter);
app.use('/api/user', userRouter);

/* Unhandle Routes */
app.all('*', (req, res, next) => {
  next(AppError.notFound(`Cannot find ${req.originalUrl} route`));
});

/* Global Error Handler */
app.use(errorHandler);

module.exports = app;
