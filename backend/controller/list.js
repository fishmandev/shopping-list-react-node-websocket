
const list = require('../model/list');

module.exports = {
  index: (req, res, next) => {
    list.fetchAll().then(rows => {
      return res.json({'items': rows});
    }).catch(next);
  },
  create: (req, res, next) => {
    list.create(req.body.name).then(result => {
      return res.status(201).json({data: result});
    }).catch(next);
  }
};