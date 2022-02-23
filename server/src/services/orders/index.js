const express = require('express');
const createOrderRouter = require('./create-order');
const getOrderRouter = require('./get-order');
const orderRouter = express.Router();

orderRouter.use(createOrderRouter);
orderRouter.use(getOrderRouter);

module.exports = orderRouter;
