const express = require('express');
const AppError = require('../../errors/app-error');
const Blog = require('../../models/blog.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/slug/:slug',
  catchAsync(async (req, res, next) => {
    const slug = req.params.slug;
    const articles = await Blog.find({
      slug: slug,
    });

    if (articles.length === 0) {
      return next(AppError.notFound('Sorry, we cannot find the article'));
    }

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve Blog successfully',
      data: {
        article: articles[0],
      },
    });
  })
);

module.exports = router;
