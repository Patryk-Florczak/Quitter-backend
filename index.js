const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
const todosRoute = require('./routes/todos');
const userRoute = require('./routes/users');
const bookmarksRoute = require('./routes/bookmarks');

app.use('/api/todos', cors(), todosRoute);
app.use('/api/user', cors(), userRoute);
app.use('/api/bookmarks', cors(), bookmarksRoute);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB Connected');
    return app.listen({ port: PORT }, () =>
      console.log(`Server running at ${PORT}`)
    );
  })
  .catch((err) => {
    console.error(err);
  });
