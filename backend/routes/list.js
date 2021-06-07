const express = require('express');
const router = express.Router();
const list = require('../controller/list');

router.get('/', list.index);
router.post('/', list.create);

module.exports = router;