const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../../middlewares/is-auth');
const validateFields = require('../../middlewares/validate-fields');
const validateRequest = require('../../middlewares/validate-request');
const Cart = require('../../models/cart.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

const requiredFields = ['items'];

const validations = [
  body('items').isArray().notEmpty().withMessage('List of items is missing'),
  body('items.*.product').notEmpty().withMessage('Product is missing'),
  body('item.*.quantity')
    .isNumeric()
    .notEmpty()
    .withMessage('Quantity is missing'),
];

router.patch(
  '/',
  isAuth,
  validateFields(requiredFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const user = req.user;
    const updatedCart = await Cart.findById(user.cart);
    updatedCart.items = req.body.items;
    await updatedCart.save();

    return res.status(200).json({
      status: 'success',
      message: 'Cart is updated successfully',
      data: {
        items: updatedCart.items,
      },
    });
  })
);

module.exports = router;
