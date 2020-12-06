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

router.post('/', authenticateToken, async (req, res) => {
  if (req.body.text.trim() !== '') {
    const todo = { text: req.body.text, user: req.user };
    const newTodo = await new Todo(todo).save();
    res.status(201).send(newTodo);
  } else res.status(400).end();
});

router.put('/:id', authenticateToken, (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body.todo).then(() =>
    Todo.find({ user: req.user._id })
      .sort({ isPinned: -1 })
      .then((result) => {
        res.send({ todos: result });
      })
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
