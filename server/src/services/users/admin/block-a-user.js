const express = require('express');
const { body, param } = require('express-validator');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const validateFields = require('../../../middlewares/validate-fields');
const validateRequest = require('../../../middlewares/validate-request');
const User = require('../../../models/user.model');
const catchAsync = require('../../../utilities/catch-async.util');
const router = express.Router();

const requireFields = ['isActive'];

const validations = [param('id').isMongoId(), body('isActive').isBoolean()];

router.patch(
  '/block/:id',
  isAuth,
  isAdmin,
  validateFields(requireFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: 'success',
      message: 'User is blocked',
      data: {
        user: updatedUser,
      },
    });
  })
);

module.exports = router;
