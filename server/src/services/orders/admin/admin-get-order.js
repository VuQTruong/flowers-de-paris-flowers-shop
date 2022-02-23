const express = require('express');
const isAuth = require('../../../middlewares/is-auth');
const isAdmin = require('../../../middlewares/is-admin');
const catchAsync = require('../../../utilities/catch-async.util');
const Order = require('../../../models/order.model');
const router = express.Router();

router.get(
  '/ad/:orderId',
  isAuth,
  isAdmin,
  catchAsync(async (req, res, next) => {
    const orderId = req.params.orderId;
    const order = await Order.findOne({ orderId: orderId });

    return res.status(200).json({
      status: 'success',
      message: `Retrieve order# ${orderId} successfully`,
      data: {
        order,
      },
    });
  })
);

module.exports = router;
