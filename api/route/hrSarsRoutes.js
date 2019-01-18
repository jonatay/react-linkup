const express = require('express');
const router = express.Router();
const empMasterController = require('../controllers/hrSars/empMasterController');
const empDetailController = require('../controllers/hrSars/empDetailController');
const empCodeController = require('../controllers/hrSars/empCodeController');

router.get('/emp-masters', empMasterController.list);
router.get('/emp-details', empDetailController.list);
router.get('/emp-codes', empCodeController.list);

module.exports = router;
