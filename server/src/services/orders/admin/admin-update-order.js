const express = require('express');
const { body } = require('express-validator');
const AppError = require('../../../errors/app-error');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const validateFields = require('../../../middlewares/validate-fields');
const validateRequest = require('../../../middlewares/validate-request');
const Order = require('../../../models/order.model');
const catchAsync = require('../../../utilities/catch-async.util');
const router = express.Router();

const requiredFields = ['isPaid', 'paidAt', 'isDelivered', 'status'];

const validations = [
  body('isPaid').isBoolean().optional(),
  body('paidAt').isISO8601().optional(),
  body('isDelivered').isBoolean().optional(),
  body('status')
    .isString()
    .isIn(['Delivered', 'Pending', 'Cancelled'])
    .optional(),
];

router.patch(
  '/ad/:orderId',
  isAuth,
  isAdmin,
  validateFields(requiredFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const orderId = req.params.orderId;
    const updateInfo = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return next(AppError.badRequest('Sorry, we cannot find the order'));
    }

    updateInfo.isPaid && (order.isPaid = updateInfo.isPaid);
    updateInfo.paidAt && (order.paidAt = updateInfo.paidAt);
    updateInfo.isDelivered && (order.isDelivered = updateInfo.isDelivered);
    updateInfo.status && (order.status = updateInfo.status);

    await order.save();

    return res.status(200).json({
      status: 'success',
      message: `Order# ${orderId} updated successfully`,
      data: {
        order,
      },
    });
  })
);

module.exports = router;
