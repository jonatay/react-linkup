var express = require('express');
var router = express.Router();

const vehicleController = require('../controllers/fleet/vehicleController');
const driverController = require('../controllers/fleet/driverController');
const transactionsController = require('../controllers/fleet/transactionsController');

router.get('/vehicles', vehicleController.vehicleList);
router.get('/drivers', driverController.driverList);
router.get('/transactions', transactionsController.transactionsList);

module.exports = router;
