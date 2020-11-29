const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res) => {
  User.find({}).then((result) => {
    console.log(result);
    // res.send({ todos: result });
  });
});

router.post('/', (req, res) => {
  const newUser = new User();
  console.log(newUser);
  res.send({ newUser });
  // newUser.save().then(() => res.status(201).end());
});

module.exports = router;
