const express = require('express');
const isAdmin = require('../../middlewares/is-admin');
const isAuth = require('../../middlewares/is-auth');
const catchAsync = require('../../utilities/catch-async.util');
const cloudinary = require('../../config/cloudinary');
const router = express.Router();

router.delete(
  '/cloud-images',
  isAuth,
  isAdmin,
  catchAsync(async (req, res, next) => {
    const query = req.query;
    const public_id = query.folder ? `${query.folder}/${query.id}` : query.id;

    await cloudinary.v2.uploader.destroy(public_id);

    return res.status(200).json({
      status: 'success',
      message: 'Image is deleted successfully',
    });
  })
);

module.exports = router;
