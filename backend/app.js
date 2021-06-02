var express = require('express');
var logger = require('morgan');
let helmet = require('helmet');

var indexRouter = require('./routes/index');

var app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

module.exports = app;
