const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../../middlewares/is-auth');
const isAdmin = require('../../middlewares/is-admin');
const catchAsync = require('../../utilities/catch-async.util');
const validateRequest = require('../../middlewares/validate-request');
const Blog = require('../../models/blog.model');
const validateFields = require('../../middlewares/validate-fields');
const router = express.Router();

const requireFields = [
  'title',
  'author',
  'tags',
  'summary',
  'content',
  'coverImage',
];

const validations = [
  body('title').isString().notEmpty().withMessage('Title is missing'),
  body('author').isString().notEmpty().withMessage('Author is missing'),
  body('tags').isArray(),
  body('summary')
    .isString()
    .notEmpty()
    .withMessage('Summary is missing')
    .trim()
    .escape(),
  body('content')
    .isString()
    .notEmpty()
    .withMessage('Content is missing')
    .trim()
    .escape(),
  body('coverImage')
    .isString()
    .notEmpty()
    .withMessage('Cover Image is missing'),
];

router.post(
  '/',
  isAuth,
  isAdmin,
  validateFields(requireFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const { title, author, tags, summary, content, coverImage } = req.body;

    const blogInfo = {
      title,
      author,
      tags,
      summary,
      content,
      coverImage,
    };

    const newBlog = await Blog.create(blogInfo);

    return res.status(201).json({
      status: 'success',
      message: 'Blog created successfully',
      data: {
        blog: newBlog,
      },
    });
  })
);

module.exports = router;
