const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');

const artworkRoutes = require('../routes/artwork');
const userRoutes = require('../routes/user');
const { handleError } = require('../helpers/error');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(artworkRoutes);
app.use(userRoutes);

app.use((err, req, res, next) => {
  if (err.statusCode === undefined) {
    err.statusCode = 500;
  }
  handleError(err, res);
});

mongoose
  .connect(process.env['MONGODB_URL'], {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(port);
    console.log('Hi from port ' + port + '!');
  })
  .catch((err) => console.log(err));
