const mongoose = require('mongoose');

const User = new mongoose.Schema({
  bookmarkCategories: {
    type: [String],
    default: ['Watch', 'Read', 'Play'],
  },
});

module.exports = mongoose.model('user', User);
