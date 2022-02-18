const express = require('express');
const getCartRouter = require('./get-cart');
const updateCartRouter = require('./update-cart');
const emptyCartRouter = require('./empty-cart');
const cartRouter = express.Router();

cartRouter.use(getCartRouter);
cartRouter.use(updateCartRouter);
cartRouter.use(emptyCartRouter);

module.exports = cartRouter;
