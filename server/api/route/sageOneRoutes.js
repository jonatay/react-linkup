const express = require("express");
const router = express.Router();

const sageOneController = require("../controllers/sageOne/sageOneController");
const soBankAccountsController = require("../controllers/sageOne/soBankAccountsController");

router.get("/sage-one", sageOneController.list);
router.get("/so-bank-accounts", soBankAccountsController.list);

module.exports = router;
