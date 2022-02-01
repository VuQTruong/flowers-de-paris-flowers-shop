const express = require('express');
const { param } = require('express-validator');
const isAuth = require('../../../middlewares/is-auth');
const validateRequest = require('../../../middlewares/validate-request');
const catchAsync = require('../../../utilities/catch-async.util');
const router = express.Router();

const validations = [param('id').isMongoId()];

router.post(
  '/favorites/:id',
  isAuth,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const itemId = req.params.id;
    const user = req.user;

    if (user.favorites.includes(itemId)) {
      return res.status(200).json({
        status: 'success',
        message: 'Item is already added',
        data: null,
      });
    }

    user.favorites.push(itemId);
    const updatedUser = await user.save();

    return res.status(201).json({
      status: 'success',
      message: 'Item is added to the favorites',
      data: {
        user: updatedUser,
      },
    });
  })
);

module.exports = router;
