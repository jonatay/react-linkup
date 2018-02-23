var express = require('express');
var router = express.Router();

const vehicleController = require('../controllers/fleet/vehicleController');
const driverController = require('../controllers/fleet/driverController');
const transactionsController = require('../controllers/fleet/transactionsController');

router.get('/vehicles', vehicleController.list);
router.put('/vehicles/:id', vehicleController.update);
router.delete('/vehicles/:id', vehicleController.toggleActive)

router.get('/drivers', driverController.list);

router.get('/transactions', transactionsController.list);

module.exports = router;
