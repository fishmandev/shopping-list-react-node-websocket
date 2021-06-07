const express = require('express');
const router = express.Router();
const list = require('../controller/list');

router.get('/', list.index);
router.post('/', list.create);
router.delete('/:id', list.delete);

module.exports = router;