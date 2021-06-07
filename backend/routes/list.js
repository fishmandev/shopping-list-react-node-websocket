const express = require('express');
const router = express.Router();
const list = require('../controller/list');

router.get('/', list.index);

module.exports = router;