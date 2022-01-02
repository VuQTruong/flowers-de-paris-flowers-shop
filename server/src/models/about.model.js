const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

const About = mongoose.model('About', aboutSchema);

module.exports = About;
