const express = require('express');
const isAdmin = require('../../middlewares/is-admin');
const isAuth = require('../../middlewares/is-auth');
const Category = require('../../models/category.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  catchAsync(async (req, res, next) => {
    const categoryId = req.params.id;
    await Category.findByIdAndDelete(categoryId);

    return res.status(200).json({
      status: 'success',
      message: 'Category deleted successfully',
    });
  })
);

module.exports = router;
