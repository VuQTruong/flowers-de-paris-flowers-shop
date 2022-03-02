const express = require('express');
const { body, param } = require('express-validator');
const AppError = require('../../../errors/app-error');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const validateFields = require('../../../middlewares/validate-fields');
const validateRequest = require('../../../middlewares/validate-request');
const Contact = require('../../../models/contact.model');
const catchAsync = require('../../../utilities/catch-async.util');
const router = express.Router();

const requireFields = ['name', 'description', 'phone', 'address', 'coverImage'];

const validations = [
  param('id').isMongoId(),
  body('name').isString().optional(),
  body('description').isString().optional().trim().escape(),
  body('phone').isString().optional(),
  body('address').isString().optional(),
  body('coverImage').isString().optional(),
];

router.patch(
  '/:id',
  isAuth,
  isAdmin,
  validateFields(requireFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const contactId = req.params.id;
    const { name, description, phone, address, coverImage } = req.body;

    const contact = await Contact.findById(contactId);

    if (!contact) {
      return next(AppError.notFound('Contact not found'));
    }

    contact.name = name || contact.name;
    contact.description = description || contact.description;
    contact.phone = phone || contact.phone;
    contact.address = address || contact.address;
    contact.coverImage = coverImage || contact.coverImage;

    await contact.save();

    return res.status(200).json({
      status: 'success',
      message: 'Contact updated successfully',
      data: {
        contact: contact,
      },
    });
  })
);

module.exports = router;
