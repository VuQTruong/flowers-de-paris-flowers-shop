const express = require('express');
const { param } = require('express-validator');
const AppError = require('../../errors/app-error');
const validateRequest = require('../../middlewares/validate-request');
const Blog = require('../../models/blog.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

const validations = [param('id').isMongoId()];

router.get(
  '/:id',
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog || !blog.isActive) {
      return next(AppError.notFound('Sorry, we cannot find the article'));
    }

    blog.views += 1;
    await blog.save();

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve Blog successfully',
      data: {
        article: blog,
      },
    });
  })
);

module.exports = router;
