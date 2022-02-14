const express = require('express');
const isAuth = require('../../middlewares/is-auth');
const isAdmin = require('../../middlewares/is-admin');
const LayoutConfig = require('../../models/layout-config.model');
const SlideConfig = require('../../models/slide-config.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.post(
  '/init',
  isAuth,
  isAdmin,
  catchAsync(async (req, res, next) => {
    const slides = [
      {
        order: 1,
        image:
          'https://res.cloudinary.com/flowersdeparis/image/upload/v1644770230/slides/slide_6_t9hsfd.jpg',
        title: `Be my <span class='emphasize'>Valentine!</span>`,
        subTitle: `Express your <span class='emphasize'>Feelings</span>`,
        content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam,
        ut. Lorem ipsum dolor sit amet consectetur, adipisicing elit.`,
        url: '',
      },
      {
        order: 2,
        image:
          'https://res.cloudinary.com/flowersdeparis/image/upload/v1644770230/slides/slide_2_yx53ea.jpg',
        title: `It's Your <span class='emphasize'>Special</span> Day!`,
        subTitle: `Be <span class='emphasize'>Together</span> for <span class='emphasize'>Life</span>`,
        content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam,
        ut. Lorem ipsum dolor sit amet consectetur, adipisicing elit.`,
        url: '',
      },
      {
        order: 3,
        image:
          'https://res.cloudinary.com/flowersdeparis/image/upload/v1644770230/slides/slide_3_ln9b3v.jpg',
        title: `Best way to say you <span class='emphasize'>Care</span>`,
        subTitle: `Sending <span class='emphasize'>Love</span>`,
        content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam,
        ut. Lorem ipsum dolor sit amet consectetur, adipisicing elit.`,
        url: '',
      },
      {
        order: 4,
        image:
          'https://res.cloudinary.com/flowersdeparis/image/upload/v1644770230/slides/slide_4_t7ump6.jpg',
        title: `Let's us arrange a <span class='emphasize'>Smile</span> for
        you`,
        subTitle: `Sending <span class='emphasize'>Love</span>`,
        content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam,
        ut. Lorem ipsum dolor sit amet consectetur, adipisicing elit.`,
        url: '',
      },
    ];

    const features = [
      {
        order: 1,
        category: 'Bouquets',
        categorySlug: 'bouquets',
        title: `Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Pariatur, impedit.`,
      },
      {
        order: 2,
        category: 'Flower Baskets',
        categorySlug: 'flower-baskets',
        title: `Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Pariatur, impedit.`,
        reverseLayout: true,
      },
      {
        order: 3,
        category: 'Gifts',
        categorySlug: 'gifts',
        title: `Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Pariatur, impedit.`,
      },
    ];

    // remove previous version of config
    await SlideConfig.deleteMany();
    await LayoutConfig.deleteMany();

    const slideConfig = await SlideConfig.insertMany(slides);

    const layoutConfig = await LayoutConfig.insertMany(features);

    return res.status(201).json({
      status: 'success',
      message: 'Initialize application config successfully',
      data: {
        slideConfig,
        layoutConfig,
      },
    });
  })
);

module.exports = router;
