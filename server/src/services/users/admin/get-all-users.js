const express = require('express');
const isAuth = require('../../../middlewares/is-auth');
const isAdmin = require('../../../middlewares/is-admin');
const catchAsync = require('../../../utilities/catch-async.util');
const User = require('../../../models/user.model');
const queryDeserialize = require('../../../utilities/queryDeserialize');
const router = express.Router();

router.get(
  '/all',
  isAuth,
  isAdmin,
  catchAsync(async (req, res, next) => {
    const queryObj = queryDeserialize(req.query);

    const allUsers = await User.find({
      ...queryObj.filters,
    })
      .sort(queryObj.sort)
      .skip(queryObj.skip)
      .limit(queryObj.limit);

    const totalUsers = await User.find({
      ...queryObj.filters,
    }).countDocuments();

    const { page, limit } = req.query;
    const totalPages = Math.ceil(totalUsers / (limit ? limit : 10));

    return res.status(200).json({
      status: 'success',
      message: 'Retriev all users',
      data: {
        results: allUsers.length,
        users: allUsers,
        totalUsers,
        totalPages,
        currentPage: page * 1 || 1,
      },
    });
  })
);

module.exports = router;
