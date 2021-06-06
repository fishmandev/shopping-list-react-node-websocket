let WebSocketServer = require('websocket').server;
let debug = require('debug')('websocket');
let wsServer = new WebSocketServer();
wsServer.clients = [];

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on('request', function (request) {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    debug((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }
  try {
    let connection = request.accept('', request.origin);
    wsServer.clients.push(connection);
    debug(connection.remoteAddress + " connected - Protocol Version " + connection.webSocketVersion);

    connection.on('message', function (message) {
      if (message.type === 'utf8') {
        console.log('Received Message:\n' + message.utf8Data);
      }
    });
    connection.on('close', function() {
      debug(connection.remoteAddress + " disconnected");
      
      let index = wsServer.clients.indexOf(connection);
      if (index !== -1) {
          // remove the connection from the pool
          wsServer.clients.splice(index, 1);
      }
  });
  } catch (err) {
    debug(err);
  }
});

module.exports = wsServer;