const express = require('express');
const router = express.Router();
const empMasterController = require('../controllers/hrSars/empMasterController')
const empDetailController = require('../controllers/hrSars/empDetailController')

router.get('/emp-masters', empMasterController.list);
router.get('/emp-details', empDetailController.list);

module.exports = router;
