const express = require('express');
const router = express.Router();
const sageBankController = require('../controllers/sagePay/sageBankController');
const sageBBranchController = require('../controllers/sagePay/sageBBranchController');
const sageAccountController = require('../controllers/sagePay/sageAccountController');
const sageSalaryBatchController = require('../controllers/sagePay/sageSalaryBatchController');

router.get('/sage-banks', sageBankController.list);
router.post('/sage-banks/import', sageBankController.import);

router.get('/sage-bbranches', sageBBranchController.list);
router.post('/sage-bbranches/import', sageBBranchController.import);

router.get('/sage-accounts', sageAccountController.list);
router.post('/sage-accounts/import-best', sageAccountController.importBest);
router.post('/sage-accounts/import-cubit', sageAccountController.importCubit);
router.post('/sage-account/validate/:id', sageAccountController.validateSage);
router.post('/sage-account', sageAccountController.create);
router.put('/sage-account/:id', sageAccountController.update);
router.delete('/sage-account/:id', sageAccountController.delete);

router.get('/salary-batches', sageSalaryBatchController.list);
router.post('/salary-batch/:id', sageSalaryBatchController.postToSage);
router.post('/salary-batch', sageSalaryBatchController.create);
router.get('/salary-batch/:id', sageSalaryBatchController.updateSageStatus);

module.exports = router;
