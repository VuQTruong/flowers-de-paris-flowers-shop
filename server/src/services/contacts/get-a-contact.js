const express = require('express');
const { param } = require('express-validator');
const validateRequest = require('../../middlewares/validate-request');
const Contact = require('../../models/contact.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

const validations = [param('id').isMongoId()];

router.get(
  '/:id',
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve Contact successfully',
      data: {
        contact,
      },
    });
  })
);

module.exports = router;
