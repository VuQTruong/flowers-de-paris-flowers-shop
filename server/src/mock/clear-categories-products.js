const express = require('express');
const mockRouter = express.Router();
const catchAsync = require('../utilities/catch-async.util');
const data = require('./data');
const Category = require('../models/category.model');

mockRouter.patch(
  '/categories',
  catchAsync(async (req, res, next) => {
    // Initialize
    await Category.updateMany(
      {},
      {
        products: [],
      }
    );

    return res.status(201).json({
      status: 'success',
      message: `Categories' products field updated successfully`,
      data: null,
    });
  })
);

module.exports = mockRouter;
