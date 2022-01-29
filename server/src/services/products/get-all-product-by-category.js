const express = require('express');
const { param } = require('express-validator');
const validateRequest = require('../../middlewares/validate-request');
const Product = require('../../models/product.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

const validations = [param('categoryId').isMongoId()];

router.get(
  '/category/:categoryId',
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const categoryId = req.params.categoryId;

    const products = await Product.find({ category: categoryId }).populate(
      'category'
    );

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve all products by category',
      data: {
        results: products.length,
        products,
      },
    });
  })
);

module.exports = router;
