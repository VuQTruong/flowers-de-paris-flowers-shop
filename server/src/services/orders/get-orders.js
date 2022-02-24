const express = require('express');
const isAuth = require('../../middlewares/is-auth');
const Order = require('../../models/order.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/all',
  isAuth,
  catchAsync(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id }).select(
      'orderId totalPrice status orderItems createdAt'
    );

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve all orders successfully',
      data: {
        results: orders.length,
        orders,
      },
    });
  })
);

module.exports = router;
