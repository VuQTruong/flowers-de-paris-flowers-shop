const mongoose = require('mongoose');

const SlideConfigSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subTitile: String,
  content: String,
  url: {
    type: String,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const SlideConfig = mongoose.model('SlideConfig', SlideConfigSchema);
module.exports = SlideConfig;
