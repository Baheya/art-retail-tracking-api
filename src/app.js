const bodyParser = require('body-parser');
const helmet = require('helmet');
const express = require('express');
const path = require('path');

require('../db/mongoose');

const artworkRoutes = require('../routes/artwork');
const userRoutes = require('../routes/user');
const saleRoutes = require('../routes/sale');
const { handleError } = require('../helpers/error');

const app = express();

app.use(helmet());
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
app.use(saleRoutes);

app.use((err, req, res, next) => {
  if (err.statusCode === undefined) {
    err.statusCode = 500;
  }
  handleError(err, res);
});

app.use(express.static(path.join(__dirname, '/../client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client', 'build', 'index.html'));
});

module.exports = app;
