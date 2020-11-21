const express = require('express');
const mongoose = require('mongoose');
const { MONGODB } = require('./config.js');
const cors = require('cors');

const app = express();

// CORS config
const whitelist = ['chrome-extension://apdflflpdlofegckfdocondolidleggo'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// ROUTES
const todosRoute = require('./routes/todos');

app.get('/', function (req, res) {
  res.send('GET request to homepage');
});

app.use('/todos', cors(corsOptions), todosRoute);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    return app.listen({ port: PORT }, () =>
      console.log(`Server running at ${PORT}`)
    );
  })
  .catch((err) => {
    console.error(err);
  });
