const express = require('express');
const AppError = require('../../errors/app-error');
const Product = require('../../models/product.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/slug/:slug',
  catchAsync(async (req, res, next) => {
    const slug = req.params.slug;
    const product = await Product.findOne({ slug: slug }).populate(
      'category reviews'
    );

    if (!product.isActive) {
      return next(AppError.notFound('Sorry, we cannot find the product'));
    }

    product.views += 1;
    product.save();

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve a product successfully',
      data: {
        product,
      },
    });
  })
);

module.exports = router;
