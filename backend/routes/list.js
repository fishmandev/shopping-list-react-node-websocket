const express = require('express');
const router = express.Router();
const list = require('../controller/list');
const listUpdate = require('../middleware/listUpdate');

router.get('/', list.index);
router.post('/', listUpdate, list.create);
router.delete('/:id', listUpdate, list.delete);
router.patch('/:id', listUpdate, list.update);

module.exports = router;