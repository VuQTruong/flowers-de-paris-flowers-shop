const express = require('express');
const { param } = require('express-validator');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const validateRequest = require('../../../middlewares/validate-request');
const catchAsync = require('../../../utilities/catch-async.util');
const CommentTag = require('../../../models/comment-tag.model');
const router = express.Router();

validations = [param('tagId').isMongoId()];

router.delete(
  '/tags/:tagId',
  isAuth,
  isAdmin,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const tagId = req.params.tagId;
    await CommentTag.findByIdAndDelete(tagId);

    return res.status(200).json({
      status: 'success',
      message: 'Tag is deleted successfully',
      data: null,
    });
  })
);

module.exports = router;
