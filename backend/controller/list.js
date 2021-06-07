
const list = require('../model/list');

module.exports = {
  index: (req, res, next) => {
    list.fetchAll().then(rows => {
      return res.json({'items': rows});
    }).catch(next);
  },
};