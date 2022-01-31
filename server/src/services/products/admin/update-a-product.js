const express = require('express');
const { body } = require('express-validator');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const validateFields = require('../../../middlewares/validate-fields');
const validateRequest = require('../../../middlewares/validate-request');
const Product = require('../../../models/product.model');
const catchAsync = require('../../../utilities/catch-async.util');
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
  body('name').isString().optional(),
  body('category').isMongoId().optional(),
  body('images').isArray().optional(),
  body('coverImage').isString().optional(),
  body('price').isNumeric().optional(),
  body('discountAmount').isNumeric().optional(),
  body('size').isString().optional(),
  body('summary').isString().optional(),
  body('description').isString().optional(),
  body('colors').isArray().optional(),
  body('tags').isArray().optional(),
];

router.patch(
  '/:id',
  isAuth,
  isAdmin,
  validateFields(requireFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const productId = req.params.id;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      status: 'success',
      message: 'Product updated successfully',
      data: {
        product: updatedProduct,
      },
    });
  })
);

module.exports = router;
