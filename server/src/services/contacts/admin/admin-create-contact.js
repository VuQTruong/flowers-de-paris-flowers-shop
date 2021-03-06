const express = require('express');
const isAuth = require('../../../middlewares/is-auth');
const isAdmin = require('../../../middlewares/is-admin');
const catchAsync = require('../../../utilities/catch-async.util');
const validateRequest = require('../../../middlewares/validate-request');
const { body } = require('express-validator');
const Contact = require('../../../models/contact.model');
const validateFields = require('../../../middlewares/validate-fields');
const router = express.Router();

const requireFields = ['name', 'description', 'phone', 'address', 'coverImage'];

const validations = [
  body('name')
    .isString()
    .notEmpty()
    .withMessage('Name of the branch is missing'),
  body('description')
    .isString()
    .notEmpty()
    .withMessage('Description of the branch is missing')
    .trim()
    .escape(),
  body('phone')
    .isString()
    .notEmpty()
    .withMessage('Phone number of the branch is missing'),
  body('address')
    .isString()
    .notEmpty()
    .withMessage('Address of the branch is missing'),
  body('coverImage')
    .isString()
    .notEmpty()
    .withMessage('Image of the branch is missing'),
];

router.post(
  '/',
  isAuth,
  isAdmin,
  validateFields(requireFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const { name, description, phone, address, coverImage, lat, long } =
      req.body;

    const contactInfo = {
      name,
      description,
      phone,
      address,
      coverImage,
      lat,
      long,
    };

    const newContact = await Contact.create(contactInfo);

    return res.status(201).json({
      status: 'success',
      message: 'Contact created successfully',
      data: {
        contact: newContact,
      },
    });
  })
);

module.exports = router;
