const express = require('express');
const isAuth = require('../../../middlewares/is-auth');
const isAdmin = require('../../../middlewares/is-admin');
const catchAsync = require('../../../utilities/catch-async.util');
const User = require('../../../models/user.model');
const router = express.Router();

router.get(
  '/all',
  isAuth,
  isAdmin,
  catchAsync(async (req, res, next) => {
    const allUsers = await User.find();

    return res.status(200).json({
      status: 'success',
      message: 'Retriev all users',
      data: {
        results: allUsers.length,
        users: allUsers,
      },
    });
  })
);

module.exports = router;
