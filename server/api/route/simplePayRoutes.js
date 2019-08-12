const express = require('express');
const router = express.Router();

const simplePayEmployeeController = require('../controllers/simplePay/simplePayEmployeeController');
const simplePayPayPointController = require('../controllers/simplePay/simplePayPayPointController');

router.get('/sp-employees', simplePayEmployeeController.list);
router.get('/pay-points', simplePayPayPointController.list);

module.exports = router;
