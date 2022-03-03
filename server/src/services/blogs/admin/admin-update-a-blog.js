const express = require('express');
const { body, param } = require('express-validator');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const validateRequest = require('../../../middlewares/validate-request');
const catchAsync = require('../../../utilities/catch-async.util');
const Blog = require('../../../models/blog.model');
const validateFields = require('../../../middlewares/validate-fields');
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
  param('id').isMongoId(),
  body('title').isString().optional(),
  body('author').isString().optional(),
  body('tags').isArray().optional(),
  body('summary').isString().optional().trim().escape(),
  body('content').isString().optional().trim(),
  body('coverImage').isString().optional(),
];

router.patch(
  '/:id',
  isAuth,
  isAdmin,
  validateFields(requireFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const blogId = req.params.id;

    const { title, author, tags, summary, content, coverImage } = req.body;

    const blog = await Blog.findById(blogId);

    blog.title = title ? title : blog.title;
    blog.author = author ? author : blog.author;
    blog.tags = tags ? tags : blog.tags;
    blog.summary = summary ? summary : blog.summary;
    blog.content = content ? content : blog.content;
    blog.coverImage = coverImage ? coverImage : blog.coverImage;

    await blog.save();

    return res.status(200).json({
      status: 'success',
      message: 'Blog updated successfully',
      data: {
        blog,
      },
    });
  })
);

module.exports = router;
