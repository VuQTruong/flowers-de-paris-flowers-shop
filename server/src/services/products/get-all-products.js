const express = require('express');
const Product = require('../../models/product.model');
const catchAsync = require('../../utilities/catch-async.util');
const queryDeserialize = require('../../utilities/queryDeserialize');
const router = express.Router();

router.get(
  '/',
  catchAsync(async (req, res, next) => {
    const queryObj = queryDeserialize(req.query);
    console.log(queryObj);

    const products = await Product.find({
      ...queryObj.filters,
    })
      .sort(queryObj.sort)
      .skip(queryObj.skip)
      .limit(queryObj.limit)
      .populate('category');

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
