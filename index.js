const express = require('express');
const mongoose = require('mongoose');
const { MONGODB, ORIGIN } = require('./config.js');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS config
const corsOptions = {
  origin: ORIGIN,
  optionsSuccessStatus: 200,
};

// ROUTES
const todosRoute = require('./routes/todos');
const userRoute = require('./routes/users');

app.use('/api/todos', cors(corsOptions), todosRoute);
app.use('/api/user', cors(corsOptions), userRoute);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGODB, {
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
