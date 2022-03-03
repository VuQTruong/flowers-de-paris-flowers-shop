const express = require('express');
const { param } = require('express-validator');
const AppError = require('../../errors/app-error');
const isAdmin = require('../../middlewares/is-admin');
const isAuth = require('../../middlewares/is-auth');
const validateRequest = require('../../middlewares/validate-request');
const Category = require('../../models/category.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

const validations = [param('id').isMongoId()];

router.get(
  '/:id',
  isAuth,
  isAdmin,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);

    if (!category.isActive) {
      return next(AppError.notFound('Sorry, we cannot find the category'));
    }

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve Category successfully',
      data: {
        category,
      },
    });
  })
);

module.exports = router;
