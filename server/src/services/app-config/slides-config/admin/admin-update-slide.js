const express = require('express');
const isAdmin = require('../../../../middlewares/is-admin');
const isAuth = require('../../../../middlewares/is-auth');
const validateRequest = require('../../../../middlewares/validate-request');
const catchAsync = require('../../../../utilities/catch-async.util');
const { body, param } = require('express-validator');
const validateFields = require('../../../../middlewares/validate-fields');
const SlideConfig = require('../../../../models/slide-config.model');
const router = express.Router();

const requireFields = ['order', 'image', 'title', 'subTitle', 'content', 'url'];

const validations = [
  param('id').isMongoId(),
  body('order').isNumeric().optional(),
  body('image').isString().optional(),
  body('title').isString().optional(),
  body('subTitle').isString().optional(),
  body('content').isString().optional(),
  body('url').isString().optional(),
];

router.patch(
  '/slides/:id',
  isAuth,
  isAdmin,
  validateFields(requireFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const slideId = req.params.id;

    const { order, image, title, subTitle, content, url } = req.body;

    const slide = await SlideConfig.findById(slideId);

    slide.order = order ? order : slide.order;
    slide.image = image ? image : slide.image;
    slide.title = title ? title : slide.title;
    slide.subTitle = subTitle ? subTitle : slide.subTitle;
    slide.content = content ? content : slide.content;
    slide.url = url ? url : slide.url;

    await slide.save();

    return res.status(200).json({
      status: 'success',
      message: 'Slides config updated successfully',
      data: {
        slide: updatedConfig,
      },
    });
  })
);

module.exports = router;
