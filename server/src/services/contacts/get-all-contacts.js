const express = require('express');
const Contact = require('../../models/contact.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/',
  catchAsync(async (req, res, next) => {
    const contacts = await Contact.find();

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve all Contacts',
      data: {
        results: contacts.length,
        contacts,
      },
    });
  })
);

module.exports = router;
