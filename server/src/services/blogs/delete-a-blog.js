const express = require('express');
const isAdmin = require('../../middlewares/is-admin');
const isAuth = require('../../middlewares/is-auth');
const Blog = require('../../models/blog.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  catchAsync(async (req, res, next) => {
    const blogId = req.params.id;
    await Blog.findByIdAndDelete(blogId);

    return res.status(200).json({
      status: 'success',
      message: 'Blog deleted successfully',
    });
  })
);

module.exports = router;
