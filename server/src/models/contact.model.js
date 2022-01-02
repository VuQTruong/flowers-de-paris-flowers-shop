const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    description: String,
    address: String,
    lat: Number,
    long: Number,
  },
  {
    timestamp: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
