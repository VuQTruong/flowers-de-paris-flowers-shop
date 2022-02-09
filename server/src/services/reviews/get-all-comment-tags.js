const express = require('express');
const isAuth = require('../../middlewares/is-auth');
const CommentTag = require('../../models/comment-tag.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/tags',
  isAuth,
  catchAsync(async (req, res, next) => {
    const tags = await CommentTag.find();

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve all comment tags',
      data: {
        results: tags.length,
        tags,
      },
    });
  })
);

module.exports = router;
