const express = require('express');
const router = express.Router();
const system = require('../controller/system');

router.get('/cleanup-purchases', system.deleteMadePurchases);

module.exports = router;