const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    default: 'Anonymous'
  },
  content: {
    type: String,
    required: true,
    minlength: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  content: {
    type: String,
    required: true,
    minlength: 20
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [commentSchema]
});

module.exports = mongoose.model('Post', postSchema);
