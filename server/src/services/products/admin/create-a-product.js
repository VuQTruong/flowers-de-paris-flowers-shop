const express = require('express');
const { oneOf, check, body } = require('express-validator');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const validateFields = require('../../../middlewares/validate-fields');
const validateRequest = require('../../../middlewares/validate-request');
const catchAsync = require('../../../utilities/catch-async.util');
const Product = require('../../../models/product.model');
const router = express.Router();

const requireFields = [
  'name',
  'category',
  'images',
  'coverImage',
  'price',
  'discountPrice',
  'size',
  'summary',
  'description',
  'colors',
  'tags',
];

const validations = [
  body('name').isString().notEmpty().withMessage('Name of product is missing'),
  body('category')
    .isMongoId()
    .notEmpty()
    .withMessage('Category of product is missing'),
  body('images')
    .isArray()
    .notEmpty()
    .withMessage('Images of product is missing'),
  body('coverImage')
    .isString()
    .notEmpty()
    .withMessage('Images of product is missing'),
  body('price')
    .isNumeric()
    .notEmpty()
    .withMessage('Price of product is missing'),
  body('discountPrice').isNumeric().optional(),
  body('size').isString().optional(),
  body('summary')
    .isString()
    .notEmpty()
    .withMessage('Summary of product is missing'),
  body('description')
    .isString()
    .notEmpty()
    .withMessage('Description of product is missing'),
  body('colors').isArray().notEmpty(),
  body('tags').isArray().notEmpty(),
];

router.post(
  '/',
  isAuth,
  isAdmin,
  validateFields(requireFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const newProduct = await Product.create(req.body);

    return res.status(200).json({
      status: 'success',
      message: 'Product created successfully',
      data: {
        product: newProduct,
      },
    });
  })
);

module.exports = router;
