const express = require('express');
const isAuth = require('../../middlewares/is-auth');
const isAdmin = require('../../middlewares/is-admin');
const catchAsync = require('../../utilities/catch-async.util');
const validateRequest = require('../../middlewares/validate-request');
const { body, oneOf, check } = require('express-validator');
const Contact = require('../../models/contact.model');
const router = express.Router();

const validations = [
  oneOf([
    check('name').exists(),
    check('description').exists(),
    check('phone').exists(),
    check('address').exists(),
  ]),
  body('name')
    .isString()
    .notEmpty()
    .withMessage('Name of the branch is missing'),
  body('description')
    .isString()
    .notEmpty()
    .withMessage('Description of the branch is missing'),
  body('phone')
    .isString()
    .notEmpty()
    .withMessage('Phone number of the branch is missing'),
  body('address')
    .isString()
    .notEmpty()
    .withMessage('Address of the branch is missing'),
];

router.post(
  '/',
  isAuth,
  isAdmin,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const { name, description, phone, address, lat, long } = req.body;

    const contactInfo = {
      name,
      description,
      phone,
      address,
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
