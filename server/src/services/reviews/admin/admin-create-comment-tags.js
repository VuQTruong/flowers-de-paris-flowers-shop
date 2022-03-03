const express = require('express');
const isAuth = require('../../../middlewares/is-auth');
const isAdmin = require('../../../middlewares/is-admin');
const catchAsync = require('../../../utilities/catch-async.util');
const { body } = require('express-validator');
const validateFields = require('../../../middlewares/validate-fields');
const validateRequest = require('../../../middlewares/validate-request');
const CommentTag = require('../../../models/comment-tag.model');
const router = express.Router();

const requireFields = ['tag'];

const validations = [
  body('tag').isString().notEmpty().withMessage('Tag name are missing'),
];

router.post(
  '/tags',
  isAuth,
  isAdmin,
  validateFields(requireFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const { tag } = req.body;

    const newTag = await CommentTag.create({
      tag: tag,
    });

    return res.status(201).json({
      status: 'success',
      message: `Comment tag is created successfully`,
      data: {
        tag: newTag,
      },
    });
  })
);

module.exports = router;
