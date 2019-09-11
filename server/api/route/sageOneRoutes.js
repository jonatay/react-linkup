const express = require("express");
const router = express.Router();

const sageOneController = require("../controllers/sageOne/sageOneController");
const soBankAccountController = require("../controllers/sageOne/soBankAccountController");
const soBankTransactionController = require("../controllers/sageOne/soBankTransactionController");

router.get("/sage-one", sageOneController.list);
router.get("/so-bank-accounts", soBankAccountController.list);
router.get("/so-bank-transactions/:params", soBankTransactionController.list);

module.exports = router;
