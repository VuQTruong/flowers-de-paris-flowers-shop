const express = require('express');
const { body, oneOf, check } = require('express-validator');
const isAdmin = require('../../middlewares/is-admin');
const isAuth = require('../../middlewares/is-auth');
const validateRequest = require('../../middlewares/validate-request');
const Contact = require('../../models/contact.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

const validations = [
  oneOf([
    check('name').exists(),
    check('description').exists(),
    check('phone').exists(),
    check('address').exists(),
  ]),
  body('name').isString().optional(),
  body('description').isString().optional(),
  body('phone').isString().optional(),
  body('address').isString().optional(),
];

router.patch(
  '/:id',
  isAuth,
  isAdmin,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const contactId = req.params.id;

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      status: 'success',
      message: 'Contact updated successfully',
      data: {
        contact: updatedContact,
      },
    });
  })
);

module.exports = router;
