
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
  },
  delete: (req, res, next) => {
    list.delete(req.params.id).then(result => {
      if (result === 1)
        return res.status(204).json();
      else
        return res.status(404).json();
    }).catch(next);
  },
};