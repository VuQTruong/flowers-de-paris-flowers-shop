require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const AppError = require('./errors/app-error');
const { errorHandler } = require('./middlewares/error-handler');

const aboutRouter = require('./services/about');
const authRouter = require('./services/auth');
const categoryRouter = require('./services/categories');
const contactRouter = require('./services/contacts');
const userRouter = require('./services/users');
const blogRouter = require('./services/blogs');
const productRouter = require('./services/products');
const reviewRouter = require('./services/reviews');

const mockRouter = require('./mock');
const appConfigRouter = require('./services/app-config');
const cartRouter = require('./services/cart');
const orderRouter = require('./services/orders');
const paymentRouter = require('./services/payments');
const fileRouter = require('./services/files');

const app = express();

// Pass the global passport object into the configuration function
require('./config/passport')(passport);

/* Serve public data */
app.use('/', express.static('public'));

/* Middlewares */
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

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
app.use('/api/config', appConfigRouter);
app.use('/api/about', aboutRouter);
app.use('/api/auth', authRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/products', productRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/users', userRouter);
app.use('/api/carts', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/files', fileRouter);

// todo: remove these routes before production
// app.use('/api/mock', mockRouter);

// handle client requests in production mode
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  });
}

/* Unhandle Routes */
app.all('*', (req, res, next) => {
  next(AppError.notFound(`Cannot find ${req.originalUrl} route`));
});

/* Global Error Handler */
app.use(errorHandler);

module.exports = app;
