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
      isActive: true,
    }).populate('category');

    const totalProducts = await Product.find({
      categorySlug: categorySlug,
      isActive: true,
    }).countDocuments();

    const { page, limit } = req.query;
    const totalPages = Math.ceil(totalProducts / (limit ? limit : 10));

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve all products by category',
      data: {
        results: products.length,
        products,
        totalProducts,
        totalPages,
        currentPage: page * 1 || 1,
      },
    });
  })
);

module.exports = router;
