const express = require('express');
const { param } = require('express-validator');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const validateRequest = require('../../../middlewares/validate-request');
const catchAsync = require('../../../utilities/catch-async.util');
const Category = require('../../../models/category.model');
const AppError = require('../../../errors/app-error');
const router = express.Router();

const validations = [param('id').isMongoId()];

router.patch(
  '/setactive/:id',
  isAuth,
  isAdmin,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const categoryId = req.params.id;

    let category = await Category.findById(categoryId);

    if (!category) {
      return next(AppError.notFound('Sorry, we cannot find the category'));
    }

    category.isActive = !category.isActive;
    await category.save();

    return res.status(200).json({
      status: 'success',
      message: 'Category status is updated successfully',
      data: {
        category,
      },
    });
  })
);

module.exports = router;
