const express = require('express');
const router = express.Router();
const sageBankController = require('../controllers/sagePay/sageBankController');
const sageBBranchController = require('../controllers/sagePay/sageBBranchController');
const sageAccountController = require('../controllers/sagePay/sageAccountController');
const sageSageBatchController = require('../controllers/sagePay/sageBatchController');

router.get('/sage-banks', sageBankController.list);
router.post('/sage-banks/import', sageBankController.import);

router.get('/sage-bbranches', sageBBranchController.list);
router.post('/sage-bbranches/import', sageBBranchController.import);

router.get('/sage-accounts', sageAccountController.list);
router.post('/sage-accounts/import-best', sageAccountController.importBest);
router.post('/sage-accounts/import-cubit', sageAccountController.importCubit);
router.put(
  '/sage-accounts/:id/validate-sage-account',
  sageAccountController.validateSageAccount
);
router.post('/sage-account', sageAccountController.create);
router.put('/sage-account/:id', sageAccountController.update);
router.delete('/sage-account/:id', sageAccountController.delete);

router.get('/sage-batches', sageSageBatchController.list);
router.post('/sage-batch/:id/post', sageSageBatchController.postToSage);
router.post('/sage-batches/create', sageSageBatchController.create);
router.get('/sage-batches/:id', sageSageBatchController.updateSageStatus);

module.exports = router;
