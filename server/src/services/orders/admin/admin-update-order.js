const express = require('express');
const { body } = require('express-validator');
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
  body('paidAt').isDate().optional(),
  body('isDelivered').isBoolean().optional(),
  body('status').isString().isIn(['Delivered', 'Pending', 'Cancelled']),
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
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: orderId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      status: 'success',
      message: `Order# ${orderId} updated successfully`,
      data: {
        order: updatedOrder,
      },
    });
  })
);

module.exports = router;
