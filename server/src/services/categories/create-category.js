const express = require('express');
const slugify = require('slugify');
const { body, oneOf, check } = require('express-validator');
const isAuth = require('../../middlewares/is-auth');
const isAdmin = require('../../middlewares/is-admin');
const catchAsync = require('../../utilities/catch-async.util');
const validateRequest = require('../../middlewares/validate-request');
const Category = require('../../models/category.model');
const router = express.Router();

const validations = [
  oneOf([check('name').exists()]),
  body('name').isString().notEmpty().withMessage('Category name is missing'),
];

router.post(
  '/',
  isAuth,
  isAdmin,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const newCategory = await Category.create(req.body);

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
