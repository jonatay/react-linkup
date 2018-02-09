const express = require('express');
const router = express.Router();
const fimsController = require('./fimsController');

router.get('/period-get', fimsController.get_period);

router.post('/voucher-insert-batch', fimsController.post_batch_import);

module.exports = router;
