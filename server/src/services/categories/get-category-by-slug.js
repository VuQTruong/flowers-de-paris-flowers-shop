const express = require('express');
const AppError = require('../../errors/app-error');
const Category = require('../../models/category.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/slug/:slug',
  catchAsync(async (req, res, next) => {
    const categorySlug = req.params.slug;
    const category = await Category.findOne({ slug: categorySlug }).select(
      'name slug coverImage isActive'
    );

    if (!category.isActive) {
      return next(AppError.notFound('Sorry, we cannot find the category'));
    }

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve Category successfully',
      data: {
        category,
      },
    });
  })
);

module.exports = router;
