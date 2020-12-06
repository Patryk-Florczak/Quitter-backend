const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../config');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).end();

  jwt.verify(token, SECRET_KEY, (err, { user }) => {
    if (err) return res.status(403).end();
    req.user = user;
    next();
  });
};
