const express = require('express');
const router = express.Router();

const authenticateToken = require('../utils/middleware');

const Bookmark = require('../models/bookmark');

router.get('/', authenticateToken, (req, res) => {
  Bookmark.find({ user: req.user._id }).then((result) => {
    res.send({ bookmarks: result });
  });
});

router.post('/', authenticateToken, async (req, res) => {
  console.log(req.body);
});

module.exports = router;
