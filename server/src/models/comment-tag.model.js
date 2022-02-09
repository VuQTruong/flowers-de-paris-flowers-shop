const mongoose = require('mongoose');

const commentTagSchema = mongoose.Schema({
  tag: String,
});

const CommentTag = mongoose.model('CommentTag', commentTagSchema);
module.exports = CommentTag;
