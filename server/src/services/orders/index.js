const express = require('express');
const createOrderRouter = require('./create-order');
const orderRouter = express.Router();

orderRouter.use(createOrderRouter);

module.exports = orderRouter;
