const ModelSOBankAccount = require("../../models/sageOne/ModelSOBankAccount");

exports.list = (req, res) => {
  ModelSOBankAccount.list().then(soBankAccounts =>
    res.json({ soBankAccounts })
  );
};
