const express = require('express');
const isAdmin = require('../../middlewares/is-admin');
const isAuth = require('../../middlewares/is-auth');
const Category = require('../../models/category.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/:id',
  isAuth,
  isAdmin,
  catchAsync(async (req, res, next) => {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve Category successfully',
      data: {
        category,
      },
    });
  })
);

module.exports = router;
