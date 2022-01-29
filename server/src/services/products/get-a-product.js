const express = require('express');
const { param } = require('express-validator');
const validateRequest = require('../../middlewares/validate-request');
const Product = require('../../models/product.model');
const { findById } = require('../../models/user.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

const validations = [param('id').isMongoId()];

router.get(
  '/:id',
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate('category');

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
