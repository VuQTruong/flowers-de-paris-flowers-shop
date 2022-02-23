const express = require('express');
const createOrderRouter = require('./create-order');
const getOrderRouter = require('./get-order');
const getAllOrdersRouter = require('./get-orders');
const cancelOrderRouter = require('./cancel-order');
const adGetAllOrdersRouter = require('./admin/admin-get-all-orders');
const adGetOrderRouter = require('./admin/admin-get-order');
const adUpdateOrderRouter = require('./admin/admin-update-order');
const orderRouter = express.Router();

/* client routes */
orderRouter.use(createOrderRouter);
orderRouter.use(getAllOrdersRouter);
orderRouter.use(getOrderRouter);
orderRouter.use(cancelOrderRouter);

/* admin routers */
orderRouter.use(adGetAllOrdersRouter);
orderRouter.use(adGetOrderRouter);
orderRouter.use(adUpdateOrderRouter);

module.exports = orderRouter;
