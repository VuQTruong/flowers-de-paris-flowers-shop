const express = require('express');
const { param } = require('express-validator');
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

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve Blog successfully',
      data: {
        blog,
      },
    });
  })
);

module.exports = router;
