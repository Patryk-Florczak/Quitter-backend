const express = require('express');
const router = express.Router();

const authenticateToken = require('../utils/middleware');

const Todo = require('../models/todo');

router.get('/', authenticateToken, (req, res) => {
  Todo.find({ user: req.user._id })
    .sort({ isPinned: -1 })
    .then((result) => {
      res.send({ todos: result });
    });
});

router.post('/', authenticateToken, (req, res) => {
  if (req.body.text.trim() !== '') {
    const todo = { text: req.body.text, user: req.user };
    new Todo(todo).save().then(() => res.status(201).end());
  } else res.status(400).end();
});

router.put('/:id', authenticateToken, (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body.todo).then(() =>
    res.status(200).end()
  );
});

router.delete('/delete_todos', authenticateToken, (req, res) => {
  Todo.deleteMany({
    user: req.user._id,
    isCompleted: req.body.isCompleted,
  }).then(() => res.status(200).end());
});

router.delete('/:id', authenticateToken, (req, res) => {
  Todo.findByIdAndRemove(req.params.id).then(() => res.status(200).end());
});

module.exports = router;
