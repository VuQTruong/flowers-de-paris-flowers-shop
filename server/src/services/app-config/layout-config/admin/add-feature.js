const express = require('express');
const { body } = require('express-validator');
const isAdmin = require('../../../../middlewares/is-admin');
const isAuth = require('../../../../middlewares/is-auth');
const validateFields = require('../../../../middlewares/validate-fields');
const validateRequest = require('../../../../middlewares/validate-request');
const LayoutConfig = require('../../../../models/layout-config.model');
const catchAsync = require('../../../../utilities/catch-async.util');
const router = express.Router();

const requireFields = [
  'order',
  'category',
  'categorySlug',
  'title',
  'reverseLayout',
];

const validations = [
  body('order').isNumeric(),
  body('category').isString(),
  body('categorySlug').isString(),
  body('title').isString(),
  body('reverseLayout').isBoolean().optional(),
];

router.post(
  '/layout',
  isAuth,
  isAdmin,
  validateFields(requireFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const feature = await LayoutConfig.create(req.body);

    return res.status(201).json({
      status: 'success',
      message: 'Feature is created succesfully',
      data: {
        feature,
      },
    });
  })
);

module.exports = router;
