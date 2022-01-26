const express = require('express');
const Blog = require('../../models/blog.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/',
  catchAsync(async (req, res, next) => {
    const blogs = await Blog.find();

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve all blogs',
      data: {
        results: blogs.length,
        blogs,
      },
    });
  })
);

module.exports = router;
