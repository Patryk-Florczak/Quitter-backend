const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const authenticateToken = require('../utils/middleware');

const User = require('../models/user');

router.get('/', authenticateToken, (req, res) => {
  User.findOne({ _id: req.user._id }).then((user) => {
    res.send({ user: user });
  });
});

router.post('/', (req, res) => {
  const user = new User();
  const token = jwt.sign({ user }, process.env.SECRET_KEY);
  res.send({ token: token, user: user });
  user.save().then(() => res.status(201).end());
});

router.put('/', authenticateToken, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, user) => {
    // TODO error handling
    user.bookmarkCategories.push(req.body.category);
    user.save().then((user) => {
      res.send({ user: user });
    });
  });
});

module.exports = router;
