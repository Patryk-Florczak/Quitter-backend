const mongoose = require('mongoose');

const User = new mongoose.Schema({
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo',
    },
  ],
});

module.exports = mongoose.model('user', User);
