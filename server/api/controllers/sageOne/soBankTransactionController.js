const ModelSOBankTransaction = require("../../models/sageOne/ModelSOBankTransaction");

exports.list = (req, res) => {
  const { filter, page } = JSON.parse(req.params.params);
  console.log(filter, page);
  ModelSOBankTransaction.list(filter, page)
    .then(soBankTransactions => res.json({ soBankTransactions }))
    .catch(e => {
      console.log(error);
      res.json({ error });
    });
};
