const express = require('express');
const { body } = require('express-validator');
const AppError = require('../../errors/app-error');
const isAuth = require('../../middlewares/is-auth');
const validateFields = require('../../middlewares/validate-fields');
const validateRequest = require('../../middlewares/validate-request');
const Order = require('../../models/order.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

const requiredFields = ['status'];

const validations = [
  body('status').isString().notEmpty().withMessage('Order status is missing'),
];

router.patch(
  '/:orderId',
  isAuth,
  validateFields(requiredFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const status = req.body.status;
    const orderId = req.params.orderId;
    const order = await Order.findOne({ orderId: orderId });

    if (!order) {
      return next(AppError.notFound('Sorry, we cannot find the order'));
    }

    // ?check if the user requests the cancellation is the one who own the order
    if (JSON.stringify(order.user) !== JSON.stringify(req.user._id)) {
      return next(
        AppError.unauthorized(
          'Sorry, you are not authorized to cancel this order'
        )
      );
    }

    // ?let the user update the status to Cancelled ONLY
    if (status !== 'Cancelled') {
      return next(AppError.badRequest('Invalid request'));
    }

    // ?prevent user updating the status if the order was cancelled
    if (order.status === 'Cancelled') {
      return next(AppError.badRequest('Sorry! The order was cancelled'));
    }

    order.status = status;
    const updatedOrder = await order.save();

    return res.status(200).json({
      status: 'success',
      message: 'Order is cancelled',
      data: {
        order: updatedOrder,
      },
    });
  })
);

module.exports = router;
