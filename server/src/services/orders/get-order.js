const express = require('express');
const AppError = require('../../errors/app-error');
const isAuth = require('../../middlewares/is-auth');
const Order = require('../../models/order.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/:orderId',
  isAuth,
  catchAsync(async (req, res, next) => {
    const orderId = req.params.orderId;
    const order = await Order.findOne({ orderId: orderId });

    if (!order || JSON.stringify(order.user) !== JSON.stringify(req.user._id)) {
      return next(
        AppError.notFound(`Sorry! We could not find the order ${orderId}`)
      );
    }

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve order successfully',
      data: {
        order,
      },
    });
  })
);

module.exports = router;
