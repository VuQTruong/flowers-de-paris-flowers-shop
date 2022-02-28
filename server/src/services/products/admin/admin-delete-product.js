const express = require('express');
const { param } = require('express-validator');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const validateRequest = require('../../../middlewares/validate-request');
const Product = require('../../../models/product.model');
const Category = require('../../../models/category.model');
const catchAsync = require('../../../utilities/catch-async.util');
const router = express.Router();

const validations = [param('id').isMongoId()];

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return next(AppError.badRequest('Sorry, we cannot find the product'));
    }

    const category = await Category.findById(product.category);
    category.products = category.products.filter((product) => {
      return JSON.stringify(product) !== JSON.stringify(productId);
    });
    await category.save();

    await product.remove();

    return res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully',
      data: null,
    });
  })
);

module.exports = router;
