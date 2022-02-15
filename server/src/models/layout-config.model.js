const mongoose = require('mongoose');

const layoutConfigSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  // category for displaying on the cover
  category: {
    type: String,
    required: true,
  },
  // categorySlug for linking to the category page
  categorySlug: {
    type: String,
    required: true,
  },
  title: String,
  // to place the cover image to the left (defaul) or right
  reverseLayout: {
    type: Boolean,
    default: false,
  },
});

const LayoutConfig = mongoose.model('LayoutConfig', layoutConfigSchema);
module.exports = LayoutConfig;
