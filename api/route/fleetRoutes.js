var express = require('express');
var router = express.Router();

const vehicleController = require('../controllers/fleet/vehicleController');
const driverController = require('../controllers/fleet/driverController');

router.get('/vehicles', vehicleController.vehicleList)


router.get('/drivers', driverController.driverList)

module.exports = router;
