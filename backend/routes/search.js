const express = require('express');
const router = express.Router();
const search = require('../controller/search');

router.post('/', search.query);

module.exports = router;