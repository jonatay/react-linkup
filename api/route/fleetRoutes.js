var express = require('express');
var router = express.Router();

const vehicleController = require('../controllers/fleet/vehicleController');
const driverController = require('../controllers/fleet/driverController');
const transactionsController = require('../controllers/fleet/transactionsController');
const costCentreController = require('../controllers/fleet/costCentreController');
const costCentreGroupController = require('../controllers/fleet/costCentreGroupController');
const transactionTypeController = require('../controllers/fleet/transactionTypeController');
const fimsController = require('../controllers/fleet/fimsController');

router.get('/vehicles', vehicleController.list);
router.put('/vehicles/:id', vehicleController.update);
router.delete('/vehicles/:id', vehicleController.toggleActive);

router.get('/drivers', driverController.list);

router.get('/transactions', transactionsController.list);

router.get('/cost-centres', costCentreController.list);
router.get('/cost-centre-groups', costCentreGroupController.list);
router.get('/transaction-types', transactionTypeController.list);

router.get('/fims-periods', fimsController.list_fims_periods);
router.post('/fims-periods/post-fims-batch', fimsController.post_fims_batch);

router.delete('/fims-periods/:id', fimsController.remove_fims_period);

module.exports = router;
