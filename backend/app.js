var express = require('express');
var logger = require('morgan');
let helmet = require('helmet');
let debug = require('debug')('http:500');
let cors = require('cors');

var indexRouter = require('./routes/index');

var app = express();

app.use(cors()); // Enable All CORS Requests
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use((req, res, next) => {
  res.status(404).json({'error': 'Not found 404'});
});
app.use((err, req, res, next) => {
  debug(err.stack);
  res.status(500).json({'error':'Something broke'});
});

module.exports = app;
