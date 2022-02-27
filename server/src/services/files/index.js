const express = require('express');
const uploadImageRouter = require('./upload-images-cloudinary');
const deleteImageRouter = require('./delete-image-cloudinary');
const fileRouter = express.Router();

fileRouter.use(uploadImageRouter);
fileRouter.use(deleteImageRouter);

module.exports = fileRouter;
