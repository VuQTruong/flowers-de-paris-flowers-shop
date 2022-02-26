const express = require('express');
const { param, body } = require('express-validator');
const AppError = require('../../../errors/app-error');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const validateFields = require('../../../middlewares/validate-fields');
const validateRequest = require('../../../middlewares/validate-request');
const User = require('../../../models/user.model');
const catchAsync = require('../../../utilities/catch-async.util');
const router = express.Router();

const validations = [param('userId').isMongoId()];

router.patch(
  '/setadmin/:userId',
  isAuth,
  isAdmin,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return next(AppError.badRequest('Sorry, we cannot find the user'));
    }

    user.isAdmin = !user.isAdmin;
    await user.save();

    return res.status(200).json({
      status: 'success',
      message: `User's administration is set successfully`,
      data: {
        user,
      },
    });
  })
);

module.exports = router;
