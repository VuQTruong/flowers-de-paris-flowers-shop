const express = require('express');
const isAuth = require('../../../middlewares/is-auth');
const isAdmin = require('../../../middlewares/is-admin');
const catchAsync = require('../../../utilities/catch-async.util');
const Order = require('../../../models/order.model');
const queryDeserialize = require('../../../utilities/queryDeserialize');
const router = express.Router();

router.get(
  '/admin/all',
  isAuth,
  isAdmin,
  catchAsync(async (req, res, next) => {
    const queryObj = queryDeserialize(req.query);

    const orders = await Order.find({
      ...queryObj.filters,
    })
      .sort(queryObj.sort)
      .skip(queryObj.skip)
      .limit(queryObj.limit);

    const totalOrders = await Order.find({
      ...queryObj.filters,
    }).countDocuments();

    const { page, limit } = req.query;
    const totalPages = Math.ceil(totalOrders / (limit ? limit : 10));

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve all orders',
      data: {
        results: orders.length,
        orders,
        totalOrders,
        totalPages,
        currentPage: page * 1 || 1,
      },
    });
  })
);

module.exports = router;
