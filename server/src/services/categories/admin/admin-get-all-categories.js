const express = require('express');
const Category = require('../../../models/category.model');
const catchAsync = require('../../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/admin',
  catchAsync(async (req, res, next) => {
    const categories = await Category.find();

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve all Categories',
      data: {
        results: categories.length,
        categories,
      },
    });
  })
);

module.exports = router;
