const express = require('express');
const Product = require('../../models/product.model');
const catchAsync = require('../../utilities/catch-async.util');
const queryDeserialize = require('../../utilities/queryDeserialize');
const router = express.Router();

router.get(
  '/',
  catchAsync(async (req, res, next) => {
    const queryObj = queryDeserialize(req.query);

    const products = await Product.find({
      ...queryObj.filters,
      isActive: true,
    })
      .sort(queryObj.sort)
      .skip(queryObj.skip)
      .limit(queryObj.limit)
      .populate('category');

    const totalProducts = await Product.find({
      ...queryObj.filters,
      isActive: true,
    }).countDocuments();

    const { page, limit } = req.query;
    const totalPages = Math.ceil(totalProducts / (limit ? limit : 10));

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve all products',
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
