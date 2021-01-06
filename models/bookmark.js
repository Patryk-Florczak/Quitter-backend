const mongoose = require('mongoose');

const Bookmark = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  link: String,
  title: String,
});

module.exports = mongoose.model('bookmark', Bookmark);