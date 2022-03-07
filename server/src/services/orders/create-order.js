const express = require('express');
const isAuth = require('../../middlewares/is-auth');
const validateRequest = require('../../middlewares/validate-request');
const catchAsync = require('../../utilities/catch-async.util');
const { customAlphabet } = require('nanoid');
const { body } = require('express-validator');
const Order = require('../../models/order.model');
const validateFields = require('../../middlewares/validate-fields');
const Product = require('../../models/product.model');
const router = express.Router();

const requiredFields = [
  'orderItems',
  'deliveryInfo',
  'sender',
  'message',
  'note',
  'card',
  'paymentMethod',
  'price',
  'shippingPrice',
  'totalPrice',
  'isPaid',
  'paidAt',
];

const validations = [
  body('orderItems')
    .isArray()
    .notEmpty()
    .withMessage('Order Items are missing'),
  body('deliveryInfo')
    .isObject()
    .notEmpty()
    .withMessage('Delivery Information is missing'),
  body('sender').isString().optional(),
  body('message').isString().optional(),
  body('note').isString().optional(),
  body('card').isObject().optional(),
  body('paymentMethod')
    .isString()
    .notEmpty()
    .withMessage('Payment method is missing'),
  body('price').isNumeric().notEmpty().withMessage('Price is missing'),
  body('shippingPrice')
    .isNumeric()
    .notEmpty()
    .withMessage('Shipping Price is missing'),
  body('totalPrice')
    .isNumeric()
    .notEmpty()
    .withMessage('Total Price is missing'),
  body('isPaid').isBoolean().optional(),
  body('paidAt').isString().optional(),
];

router.post(
  '/',
  isAuth,
  validateFields(requiredFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const {
      orderItems,
      deliveryInfo,
      sender,
      message,
      note,
      card,
      paymentMethod,
      price,
      shippingPrice,
      totalPrice,
      isPaid,
      paidAt,
    } = req.body;

    const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 7);
    const orderId = nanoid();

    const order = await Order.create({
      orderId,
      user: req.user._id,
      orderItems,
      deliveryInfo,
      sender,
      message,
      note,
      card,
      paymentMethod,
      price,
      shippingPrice,
      totalPrice,
      isPaid,
      paidAt,
    });

    // !update sold quantity of ordered items
    const productsPromises = orderItems.map((item) => {
      return Product.findById(item.productId);
    });

    const products = await Promise.all(productsPromises);

    const updatePromises = products.map((item, index) => {
      item.soldQty += orderItems[index].quantity;
      item.save();
    });
    await Promise.all(updatePromises);

    return res.status(201).json({
      status: 'success',
      message: 'Order is created successfully',
      data: {
        order,
      },
    });
  })
);

module.exports = router;
