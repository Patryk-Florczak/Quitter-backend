const express = require('express');
const router = express.Router();

const Todo = require('../models/todo');

router.get('/', (req, res) => {
  Todo.find({})
    .sort({ isPinned: -1 })
    .then((result) => {
      res.send({ todos: result });
    });
});

router.post('/', (req, res) => {
  if (req.body.text.trim() !== '') {
    const todo = new Todo(req.body);
    todo.save().then(() => res.status(201).end());
  } else res.status(400).end();
});

router.put('/:id', (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body.todo).then(() =>
    res.status(200).end()
  );
});

router.delete('/delete_todos', (req, res) => {
  Todo.deleteMany({ isCompleted: req.body.isCompleted }).then(() =>
    res.status(200).end()
  );
});

router.delete('/:id', (req, res) => {
  Todo.findByIdAndRemove(req.params.id).then(() => res.status(200).end());
});

module.exports = router;
