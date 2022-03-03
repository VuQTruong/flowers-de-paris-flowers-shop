const express = require('express');
const { param } = require('express-validator');
const isAdmin = require('../../../../middlewares/is-admin');
const isAuth = require('../../../../middlewares/is-auth');
const validateRequest = require('../../../../middlewares/validate-request');
const SlideConfig = require('../../../../models/slide-config.model');
const catchAsync = require('../../../../utilities/catch-async.util');
const router = express.Router();

const validations = [param('id').isMongoId()];

router.delete(
  '/slides/:id',
  isAuth,
  isAdmin,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const slideId = req.params.id;
    await SlideConfig.findByIdAndDelete(slideId);

    return res.status(200).json({
      status: 'success',
      message: 'Slide is deleted successully',
      data: null,
    });
  })
);

module.exports = router;
