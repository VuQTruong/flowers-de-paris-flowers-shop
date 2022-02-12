const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../../../middlewares/is-auth');
const validateFields = require('../../../middlewares/validate-fields');
const validateRequest = require('../../../middlewares/validate-request');
const catchAsync = require('../../../utilities/catch-async.util');
const router = express.Router();

const requiredFields = ['favorites'];

const validations = [body('favorites').isArray()];

router.patch(
  '/favorites',
  isAuth,
  validateFields(requiredFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const user = req.user;
    user.favorites = req.body.favorites;

    const updatedUser = await user.save();

    return res.status(200).json({
      status: 'success',
      message: 'User favorites updated successfully',
      data: {
        user: updatedUser,
      },
    });
  })
);

module.exports = router;
