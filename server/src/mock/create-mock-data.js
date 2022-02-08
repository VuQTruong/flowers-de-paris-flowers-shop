const express = require('express');
const mockRouter = express.Router();
const catchAsync = require('../utilities/catch-async.util');
const data = require('./data');
const Product = require('../models/product.model');
const Category = require('../models/category.model');

mockRouter.post(
  '/',
  catchAsync(async (req, res, next) => {
    // Remove all products before initializing
    await Product.deleteMany();

    // Initialize
    // const products = await Product.insertMany(data);

    for (let product of data) {
      const newProduct = await Product.create(product);

      // !wire up relationship with related category
      const category = await Category.findById(product.category);

      if (!category) {
        return next(AppError.badRequest('Category is not exist!'));
      }

      category.products.unshift(newProduct._id);
      await category.save();
    }

    return res.status(201).json({
      status: 'success',
      message: 'Mock data created',
      data: null,
    });
  })
);

module.exports = mockRouter;
