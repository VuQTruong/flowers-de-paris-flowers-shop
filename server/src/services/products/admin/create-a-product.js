const express = require('express');
const { oneOf, check, body } = require('express-validator');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const validateFields = require('../../../middlewares/validate-fields');
const validateRequest = require('../../../middlewares/validate-request');
const catchAsync = require('../../../utilities/catch-async.util');
const Product = require('../../../models/product.model');
const Category = require('../../../models/category.model');
const AppError = require('../../../errors/app-error');
const router = express.Router();

const requireFields = [
  'name',
  'category',
  'images',
  'coverImage',
  'price',
  'discountAmount',
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
  body('discountAmount').isNumeric().optional(),
  body('size').isString().optional(),
  body('summary')
    .isString()
    .notEmpty()
    .withMessage('Summary of product is missing')
    .trim()
    .escape(),
  body('description')
    .isString()
    .notEmpty()
    .withMessage('Description of product is missing')
    .trim()
    .escape(),
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

    // !wire up relationship with related category
    const category = await Category.findById(req.body.category);

    if (!category) {
      return next(AppError.badRequest('Category is not exist!'));
    }

    category.products.unshift(newProduct._id);
    await category.save();

    return res.status(201).json({
      status: 'success',
      message: 'Product created successfully',
      data: {
        product: newProduct,
      },
    });
  })
);

module.exports = router;
