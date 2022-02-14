const express = require('express');
const isAdmin = require('../../../../middlewares/is-admin');
const isAuth = require('../../../../middlewares/is-auth');
const validateRequest = require('../../../../middlewares/validate-request');
const catchAsync = require('../../../../utilities/catch-async.util');
const { body, param } = require('express-validator');
const validateFields = require('../../../../middlewares/validate-fields');
const LayoutConfig = require('../../../../models/layout-config.model');
const router = express.Router();

const requireFields = [
  'order',
  'category',
  'categorySlug',
  'title',
  'reverseLayout',
];

const validations = [
  param('id').isMongoId(),
  body('order').isNumeric().optional(),
  body('category').isString().optional(),
  body('categorySlug').isString().optional(),
  body('title').isString().optional(),
  body('reverseLayout').isBoolean().optional(),
];

router.patch(
  '/layout/:id',
  isAuth,
  isAdmin,
  validateFields(requireFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const featureId = req.params.id;

    const updatedConfig = await LayoutConfig.findByIdAndUpdate(
      featureId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      status: 'success',
      message: 'Feature is updated successfully',
      data: {
        feature: updatedConfig,
      },
    });
  })
);

module.exports = router;
