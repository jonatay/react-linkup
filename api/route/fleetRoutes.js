var express = require('express');
var router = express.Router();

const vehicleController = require('../controllers/fleet/vehicleController');
const driverController = require('../controllers/fleet/driverController');
const fleetTransactionController = require('../controllers/fleet/fleetTransactionController');
const costCentreController = require('../controllers/fleet/costCentreController');
const costCentreGroupController = require('../controllers/fleet/costCentreGroupController');
const transactionTypeController = require('../controllers/fleet/transactionTypeController');
const fimsController = require('../controllers/fleet/fimsController');
const vehicleCcgController = require('../controllers/fleet/vehicleCcgController');
const transactionTypeCostCentreController = require('../controllers/fleet/transactionTypeCostCentreController')

router.get('/vehicles', vehicleController.list);
router.put('/vehicles/:id', vehicleController.update);
router.delete('/vehicles/:id', vehicleController.toggleActive);

router.get('/vehicle-ccgs', vehicleCcgController.list);
router.post('/vehicle-ccgs', vehicleCcgController.insert);
router.put('/vehicle-ccgs/:id', vehicleCcgController.update);
router.delete('/vehicle-ccgs/:id', vehicleCcgController.delete);

router.get('/drivers', driverController.list);

router.get('/fleet-transactions/:params', fleetTransactionController.list);

router.get('/cost-centres', costCentreController.list);
router.put('/cost-centres/:id', costCentreController.update);
router.post('/cost-centres/', costCentreController.create);
router.delete('/cost-centres/:id', costCentreController.delete);

router.get('/cost-centre-groups', costCentreGroupController.list);
router.put('/cost-centre-groups/:id', costCentreGroupController.update);
router.post('/cost-centre-groups/', costCentreGroupController.create);
router.delete('/cost-centre-groups/:id', costCentreGroupController.delete);

router.get('/transaction-type-cost-centres', transactionTypeCostCentreController.list);
router.put('/transaction-type-cost-centres/:id', transactionTypeCostCentreController.update);
router.post('/transaction-type-cost-centres/', transactionTypeCostCentreController.create);
router.delete('/transaction-type-cost-centres/:id', transactionTypeCostCentreController.delete);

router.get('/transaction-types', transactionTypeController.list);

router.get('/fims-periods', fimsController.list_fims_periods);
router.post('/fims-periods/post-fims-batch', fimsController.post_fims_batch);

router.delete('/fims-periods/:id', fimsController.remove_fims_period);

router.put(
  '/fims-periods/:id/import-fims-period',
  fimsController.import_fims_period
);

module.exports = router;
