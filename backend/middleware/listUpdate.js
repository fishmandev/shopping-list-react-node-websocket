const list = require('../model/list');

module.exports = (req, res, next) => {
  res.on("finish", () => {
    const code = res.statusCode;
    if (code === 204 || code === 201) {
      list.fetchAll().then(rows => {
        req.ws.clients.forEach(client => {
          client.sendUTF(JSON.stringify(rows));
        });
      });
    }
  });
  next();
}