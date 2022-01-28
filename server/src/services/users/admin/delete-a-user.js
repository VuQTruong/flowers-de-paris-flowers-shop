const express = require('express');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const User = require('../../../models/user.model');
const catchAsync = require('../../../utilities/catch-async.util');
const router = express.Router();

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  catchAsync(async (req, res, next) => {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      status: 'sucess',
      message: 'User deleted sucessfully',
      data: null,
    });
  })
);

module.exports = router;
