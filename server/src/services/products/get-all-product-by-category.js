const express = require('express');
const validateRequest = require('../../middlewares/validate-request');
const Product = require('../../models/product.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/category/:categorySlug',
  catchAsync(async (req, res, next) => {
    const categorySlug = req.params.categorySlug;

    const products = await Product.find({
      categorySlug: categorySlug,
    }).populate('category');

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
