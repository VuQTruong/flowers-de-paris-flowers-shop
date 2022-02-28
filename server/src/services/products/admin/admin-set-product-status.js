const express = require('express');
const { param } = require('express-validator');
const AppError = require('../../../errors/app-error');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const validateRequest = require('../../../middlewares/validate-request');
const Product = require('../../../models/product.model');
const catchAsync = require('../../../utilities/catch-async.util');
const router = express.Router();

const validations = [param('id').isMongoId()];

router.patch(
  '/setstatus/:id',
  isAuth,
  isAdmin,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const productId = req.params.id;

    const product = await Product.findById(productId).populate('category');

    if (!product) {
      return next(AppError.badRequest('Sorry, we cannot find the product'));
    }

    if (!product.category.isActive) {
      return next(
        AppError.badRequest(
          'The category is being deactivated. Please activate the category in advance!'
        )
      );
    }

    product.isActive = !product.isActive;
    await product.save();

    return res.status(200).json({
      status: 'success',
      message: `Product's status updated successfully`,
      data: {
        product,
      },
    });
  })
);

module.exports = router;
