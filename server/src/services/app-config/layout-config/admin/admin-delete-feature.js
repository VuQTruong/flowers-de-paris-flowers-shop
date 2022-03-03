const express = require('express');
const { param } = require('express-validator');
const isAdmin = require('../../../../middlewares/is-admin');
const isAuth = require('../../../../middlewares/is-auth');
const validateRequest = require('../../../../middlewares/validate-request');
const LayoutConfig = require('../../../../models/layout-config.model');
const catchAsync = require('../../../../utilities/catch-async.util');
const router = express.Router();

const validations = [param('id').isMongoId()];

router.delete(
  '/layout/:id',
  isAuth,
  isAdmin,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const featureId = req.params.id;
    await LayoutConfig.findByIdAndDelete(featureId);

    return res.status(200).json({
      status: 'success',
      message: 'Feature is deleted successully',
      data: null,
    });
  })
);

module.exports = router;
