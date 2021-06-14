const list = require('../model/list');

module.exports = {
  deleteMadePurchases: (req, res, next) => {
    list.deleteMadePurchases()
      .then(() => res.status(204).json())
      .catch(next);
  }
};