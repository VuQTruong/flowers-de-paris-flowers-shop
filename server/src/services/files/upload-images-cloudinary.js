const express = require('express');
const isAdmin = require('../../middlewares/is-admin');
const isAuth = require('../../middlewares/is-auth');
const { uploadImage } = require('../../middlewares/multer');
const catchAsync = require('../../utilities/catch-async.util');
const { removeFile } = require('../../utilities/helpers.util');
const cloudinary = require('../../config/cloudinary');
const router = express.Router();

router.post(
  '/cloud-images',
  isAuth,
  isAdmin,
  uploadImage.array('file', 20),
  catchAsync(async (req, res, next) => {
    const images = req.files;
    let imageUrls = [];

    // Upload image to Cloudinary
    for (const image of images) {
      const uploadImage = await cloudinary.v2.uploader.upload(image.path, {
        folder: req.body.cloudFolder,
        use_filename: req.body.useFileName ? req.body.useFileName : false,
      });

      imageUrls.push(uploadImage.secure_url);

      // ?remove temporary file
      removeFile(image.path);
    }

    return res.status(201).json({
      status: 'success',
      message: 'Image is uploaded successfully',
      data: {
        images: imageUrls,
      },
    });
  })
);

module.exports = router;
