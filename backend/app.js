var express = require('express');
var logger = require('morgan');
let helmet = require('helmet');
let debug = require('debug')('http:500');
let cors = require('cors');
let wsServer = require('./websocket');

var indexRouter = require('./routes/index');
var listRouter = require('./routes/list');
var systemRouter = require('./routes/system');

var app = express();
/**
 * Create HTTP server.
 */
const server = require('http').createServer(app);
wsServer.mount({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false
});
let ws = require('./middleware/ws')(wsServer);

app.use(ws);
if (process.env.CORS_ORIGIN) {
  app.use(cors({ origin: process.env.CORS_ORIGIN }));
}
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/lists', listRouter);
app.use('/system', systemRouter);

app.use((req, res, next) => {
  res.status(404).json({ 'error': 'Not found 404' });
});
app.use((err, req, res, next) => {
  debug(err.stack);
  res.status(500).json({ 'error': 'Something broke' });
});

module.exports = { app: app, server: server };
