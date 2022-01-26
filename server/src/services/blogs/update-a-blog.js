const express = require('express');
const { body, oneOf, check } = require('express-validator');
const isAdmin = require('../../middlewares/is-admin');
const isAuth = require('../../middlewares/is-auth');
const validateRequest = require('../../middlewares/validate-request');
const catchAsync = require('../../utilities/catch-async.util');
const Blog = require('../../models/blog.model');
const router = express.Router();

const validations = [
  oneOf([
    check('title').exists(),
    check('author').exists(),
    check('tags').exists(),
    check('summary').exists(),
    check('content').exists(),
    check('coverImage').exists(),
  ]),
  body('title').isString().optional(),
  body('author').isString().optional(),
  body('tags').isArray().optional(),
  body('summary').isString().optional(),
  body('content').isString().optional(),
  body('coverImage').isString().optional(),
];

router.patch(
  '/:id',
  isAuth,
  isAdmin,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const blogId = req.params.id;

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Blog updated successfully',
      data: {
        blog: updatedBlog,
      },
    });
  })
);

module.exports = router;
