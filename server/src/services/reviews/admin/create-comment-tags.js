const express = require('express');
const isAuth = require('../../../middlewares/is-auth');
const isAdmin = require('../../../middlewares/is-admin');
const catchAsync = require('../../../utilities/catch-async.util');
const { body } = require('express-validator');
const validateFields = require('../../../middlewares/validate-fields');
const validateRequest = require('../../../middlewares/validate-request');
const CommentTag = require('../../../models/comment-tag.model');
const router = express.Router();

const requireFields = ['tags'];

const validations = [
  body('tags').isArray().notEmpty().withMessage('Tag names are missing'),
];

router.post(
  '/tags',
  isAuth,
  isAdmin,
  validateFields(requireFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const tagsInput = [];

    for (let tag of req.body.tags) {
      tagsInput.push({ tag });
    }

    const tags = await CommentTag.insertMany(tagsInput);

    return res.status(201).json({
      status: 'success',
      message: `Created ${tags.length} comment tags`,
      data: {
        results: tags.length,
        tags,
      },
    });
  })
);

module.exports = router;
