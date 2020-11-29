const mongoose = require('mongoose');

const Todo = new mongoose.Schema({
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  text: String,
});

module.exports = mongoose.model('todo', Todo);
