const express = require('express');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const validateRequest = require('../../../middlewares/validate-request');
const catchAsync = require('../../../utilities/catch-async.util');
const CommentTag = require('../../../models/comment-tag.model');
const { param, body } = require('express-validator');
const validateFields = require('../../../middlewares/validate-fields');
const router = express.Router();

const requireFields = ['tag'];

const validations = [
  param('tagId').isMongoId(),
  body('tag').isString().notEmpty().withMessage('Tag name is missing'),
];

router.patch(
  '/tags/:tagId',
  isAuth,
  isAdmin,
  validateFields(requireFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const tagId = req.params.tagId;
    const updatedTag = await CommentTag.findByIdAndUpdate(tagId, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Tag is updated successfully',
      data: {
        tag: updatedTag,
      },
    });
  })
);

module.exports = router;
