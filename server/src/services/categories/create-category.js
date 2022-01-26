const express = require('express');
const slugify = require('slugify');
const { body } = require('express-validator');
const isAuth = require('../../middlewares/is-auth');
const isAdmin = require('../../middlewares/is-admin');
const catchAsync = require('../../utilities/catch-async.util');
const validateRequest = require('../../middlewares/validate-request');
const Category = require('../../models/category.model');
const router = express.Router();

const validations = [
  body('name').isString().notEmpty().withMessage('Category name is missing'),
];

router.post(
  '/',
  isAuth,
  isAdmin,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const { name } = req.body;
    const slug = slugify(name, {
      lower: true,
      trim: true,
      locale: 'vi',
    });

    const categoryInfo = {
      name,
      slug,
    };

    const newCategory = await Category.create(categoryInfo);

    return res.status(201).json({
      status: 'success',
      message: 'New Category created successfully',
      data: {
        category: newCategory,
      },
    });
  })
);

module.exports = router;
