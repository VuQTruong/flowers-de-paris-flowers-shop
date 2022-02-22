const express = require('express');
// const stripePaymentRouter = require('./stripe-payment');
const paypalPaymentRouter = require('./paypal-payment');
const paymentRouter = express.Router();

// paymentRouter.use(stripePaymentRouter);
paymentRouter.use(paypalPaymentRouter);

module.exports = paymentRouter;
