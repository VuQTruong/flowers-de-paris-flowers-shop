const express = require('express');
const slugify = require('slugify');
const { body, oneOf, check, param } = require('express-validator');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const validateRequest = require('../../../middlewares/validate-request');
const catchAsync = require('../../../utilities/catch-async.util');
const Category = require('../../../models/category.model');
const validateFields = require('../../../middlewares/validate-fields');
const router = express.Router();

const requireFields = ['name', 'coverImage'];

const validations = [
  param('id').isMongoId(),
  body('name').isString().optional(),
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
    const categoryId = req.params.id;

    const { name, coverImage } = req.body;

    let category = await Category.findById(categoryId);

    if (!category) {
      return next(AppError.notFound('Sorry, we cannot find the category'));
    }

    category.name = name ? name : category.name;
    category.coverImage = coverImage ? coverImage : category.coverImage;

    const updatedCategory = await category.save();

    return res.status(200).json({
      status: 'success',
      message: 'Category updated successfully',
      data: {
        category: updatedCategory,
      },
    });
  })
);

module.exports = router;
