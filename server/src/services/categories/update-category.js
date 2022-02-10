const express = require('express');
const slugify = require('slugify');
const { body, oneOf, check, param } = require('express-validator');
const isAdmin = require('../../middlewares/is-admin');
const isAuth = require('../../middlewares/is-auth');
const validateRequest = require('../../middlewares/validate-request');
const catchAsync = require('../../utilities/catch-async.util');
const Category = require('../../models/category.model');
const validateFields = require('../../middlewares/validate-fields');
const router = express.Router();

const requireFields = ['name'];

const validations = [
  param('id').isMongoId(),
  body('name').isString().notEmpty().withMessage('Category name is missing'),
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

    const { name } = req.body;
    const slug = slugify(name, {
      lower: true,
      trim: true,
      locale: 'vi',
      strict: true,
    });

    const categoryInfo = {
      name,
      slug,
    };

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      categoryInfo,
      {
        new: true,
        runValidators: true,
      }
    );

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
