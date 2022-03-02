const express = require('express');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const Blog = require('../../../models/blog.model');
const catchAsync = require('../../../utilities/catch-async.util');
const queryDeserialize = require('../../../utilities/queryDeserialize');
const router = express.Router();

router.get(
  '/admin',
  isAuth,
  isAdmin,
  catchAsync(async (req, res, next) => {
    const queryObj = queryDeserialize(req.query);

    const blogs = await Blog.find({
      ...queryObj.filters,
    })
      .sort(queryObj.sort)
      .skip(queryObj.skip)
      .limit(queryObj.limit);

    const totalBlogs = await Blog.find({
      ...queryObj.filters,
    }).countDocuments();

    const { page, limit } = req.query;
    const totalPages = Math.ceil(totalBlogs / (limit ? limit : 10));

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve all blogs',
      data: {
        results: blogs.length,
        blogs,
        totalBlogs,
        totalPages,
        currentPage: page * 1 || 1,
      },
    });
  })
);

module.exports = router;
