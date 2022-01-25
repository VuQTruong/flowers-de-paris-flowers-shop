const express = require('express');
const Contact = require('../../models/contact.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/:id',
  catchAsync(async (req, res, next) => {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);

    return res.status(200).json({
      status: 'success',
      message: '',
    });
  })
);

module.exports = router;
