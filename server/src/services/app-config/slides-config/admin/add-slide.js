const express = require('express');
const { body } = require('express-validator');
const isAdmin = require('../../../../middlewares/is-admin');
const isAuth = require('../../../../middlewares/is-auth');
const validateFields = require('../../../../middlewares/validate-fields');
const validateRequest = require('../../../../middlewares/validate-request');
const SlideConfig = require('../../../../models/slide-config.model');
const catchAsync = require('../../../../utilities/catch-async.util');
const router = express.Router();

const requireFields = ['order', 'image', 'title', 'subTitle', 'content', 'url'];

const validations = [
  body('order').isNumeric(),
  body('image').isString(),
  body('title').isString(),
  body('subTitle').isString().optional(),
  body('content').isString().optional(),
  body('url').isString().optional(),
];

router.post(
  '/slides',
  isAuth,
  isAdmin,
  validateFields(requireFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const feature = await SlideConfig.create(req.body);

    return res.status(201).json({
      status: 'success',
      message: 'Slide is created succesfully',
      data: {
        feature,
      },
    });
  })
);

module.exports = router;
