const express = require('express');
const router = express.Router();
const empMasterController = require('../controllers/hrSars/empMasterController');
const empDetailController = require('../controllers/hrSars/empDetailController');
const empCodeController = require('../controllers/hrSars/empCodeController');
const codeLkpController = require('../controllers/hrSars/codeLkpController');

router.get('/cubit-companies', empMasterController.listCubitCompanies);
router.get('/emp-masters', empMasterController.list);
router.post('/emp-masters', empMasterController.create);
router.post(
  '/emp-masters/import-emp-master',
  empMasterController.importEmp501Text
);
router.delete('/emp-masters/:id', empMasterController.remove);

router.get('/emp-details', empDetailController.list);
router.post(
  '/emp-details/import-emp-easyfile',
  empDetailController.importEasyfile
);

router.get('/emp-codes', empCodeController.list);
router.get('/code-lkps', codeLkpController.list);
router.get('/download-emp501/:id', empMasterController.downloadEmp501);

module.exports = router;
