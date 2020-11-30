const mongoose = require('mongoose');

const Todo = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
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
