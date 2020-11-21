const express = require('express');
const router = express.Router();

const Todo = require('../models/todo');

router.get('/', function (req, res) {
  try {
    Todo.find({}).then((result) => {
      res.send({ todos: result });
    });
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
