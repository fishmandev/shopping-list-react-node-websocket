const product = require('../model/product');

module.exports = {
  query: (req, res, next) => {
    if (req.body.query.length > 0) {
      product.search(req.body.query).then(rows => {
        return res.json({ 'items': rows });
      }).catch(next);
    } else {
      return res.json({ 'items': [] });
    }
  }
};