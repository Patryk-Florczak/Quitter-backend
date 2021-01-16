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
  const bookmark = {
    title: req.body.bookmark.title,
    link: req.body.bookmark.link,
    category: req.body.bookmark.category,
    user: req.user,
  };
  const newBookmark = await new Bookmark(bookmark).save();
  res.status(201).send(newBookmark);
});

module.exports = router;
