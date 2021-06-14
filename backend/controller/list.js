
const list = require('../model/list');
const product = require('../model/product');

module.exports = {
  index: (req, res, next) => {
    list.fetchAll().then(rows => {
      return res.json({ 'items': rows });
    }).catch(next);
  },
  create: async (req, res, next) => {
    try {
      let productId = await product.getIdByName(req.body.name);
      if (null === productId) {
        productId = await product.create(req.body.name);
      }
      let result = await list.create(productId);

      return res.status(201).json({ data: result });
    } catch (err) {
      next(err);
    }
  },
  delete: (req, res, next) => {
    list.delete(req.params.id).then(result => {
      if (result === 1)
        return res.status(204).json();
      else
        return res.status(404).json();
    }).catch(next);
  },
  update: (req, res, next) => {
    list.update(req.params.id, req.body.isBought).then(() => {
      return res.status(204).json();
    }).catch(next);
  },
};