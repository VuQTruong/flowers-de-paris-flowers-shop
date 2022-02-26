const express = require('express');
const { param } = require('express-validator');
const AppError = require('../../../errors/app-error');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const validateRequest = require('../../../middlewares/validate-request');
const Blog = require('../../../models/blog.model');
const catchAsync = require('../../../utilities/catch-async.util');
const router = express.Router();

const validations = [param('id').isMongoId()];

router.patch(
  '/setactive/:id',
  isAuth,
  isAdmin,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const blogId = req.params.id;

    const block = await Blog.findById(blogId);

    if (!block) {
      return next(AppError.badRequest('Sorry, we cannot find the block'));
    }

    block.isActive = !block.isActive;
    await block.save();

    return res.status(200).json({
      status: 'success',
      message: `Block's status is set successfully`,
      data: {
        block,
      },
    });
  })
);

module.exports = router;
