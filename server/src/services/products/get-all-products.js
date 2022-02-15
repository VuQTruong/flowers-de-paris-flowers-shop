const express = require('express');
const Product = require('../../models/product.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/',
  catchAsync(async (req, res, next) => {
    console.log(req.query);

    const products = await Product.find({
      isActive: true,
    }).populate('category');

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve all products',
      data: {
        results: products.length,
        products,
      },
    });
  })
);

module.exports = router;
