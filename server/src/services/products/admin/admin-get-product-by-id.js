const express = require('express');
const { param } = require('express-validator');
const AppError = require('../../../errors/app-error');
const validateRequest = require('../../../middlewares/validate-request');
const Product = require('../../../models/product.model');
const catchAsync = require('../../../utilities/catch-async.util');
const isAuth = require('../../../middlewares/is-auth');
const isAdmin = require('../../../middlewares/is-admin');
const router = express.Router();

const validations = [param('id').isMongoId()];

router.get(
  '/admin/:id',
  isAuth,
  isAdmin,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate(
      'category reviews'
    );

    if (!product) {
      return next(AppError.notFound('Sorry, we cannot find the product'));
    }

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve a product successfully',
      data: {
        product,
      },
    });
  })
);

module.exports = router;
