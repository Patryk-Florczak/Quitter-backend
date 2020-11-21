const mongoose = require('mongoose');

const Todo = new mongoose.Schema({
  id: Number,
  isCompleted: Boolean,
  isPinned: Boolean,
  text: String,
});

module.exports = mongoose.model('todo', Todo);
