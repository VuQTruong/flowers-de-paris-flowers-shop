const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../../middlewares/is-auth');
const validateFields = require('../../middlewares/validate-fields');
const validateRequest = require('../../middlewares/validate-request');
const Cart = require('../../models/cart.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

const requiredFields = ['items', 'subTotal'];

const validations = [
  body('items').isArray().notEmpty().withMessage('List of items is missing'),
  body('items.*.productId')
    .isMongoId()
    .notEmpty()
    .withMessage('Product Id is missing'),
  body('item.*.quantity')
    .isNumeric()
    .notEmpty()
    .withMessage('Quantity is missing'),
  body('item.*.price').isNumeric().notEmpty().withMessage('Price is missing'),
  body('item.*.total').isNumeric().notEmpty().withMessage('Total is missing'),

  body('subTotal').isNumeric().notEmpty().withMessage('Sub total is missing'),
];

router.patch(
  '/',
  isAuth,
  validateFields(requiredFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const user = req.user;
    const updatedCart = await Cart.findByIdAndUpdate(user.cart, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Cart is updated successfully',
      data: {
        cart: updatedCart,
      },
    });
  })
);

module.exports = router;
