const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catch-async.util');
const data = require('./data');
const Category = require('../models/category.model');

router.post(
  '/categories',
  catchAsync(async (req, res, next) => {
    // Remove all products before initializing
    await Category.deleteMany();

    // Initialize
    await Category.insertMany(data.categories);

    return res.status(201).json({
      status: 'success',
      message: 'Mock categories created',
      data: null,
    });
  })
);

module.exports = router;
