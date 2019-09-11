const callSageOneAPI = require("../../services/sageOne/sageOneApi");
const myCache = require("../../services/myCache");

exports.list = () => {
  return new Promise((resolve, reject) => {
    const soBankAccounts = myCache.get("soBankAccounts");
    //console.log(soBankAccounts);
    if (soBankAccounts) {
      resolve(soBankAccounts);
    } else {
      callSageOneAPI(
        {
          endpoint: "BankAccount/Get",
          method: "get"
        },
        (err, data) =>
          err
            ? reject(err)
            : myCache.set("soBankAccounts", data.Results, 60000) &&
              resolve(data.Results)
      );
    }
  });
};

/*

Name(pin):"Bank Security"
BankName(pin):"Standard Bank"
AccountNumber(pin):"062210106"
BranchName(pin):"Vryheid"
BranchNumber(pin):"000007924"
Active(pin):true
Default(pin):true
Balance(pin):573087.76
Description(pin):""
LastTransactionDate(pin):"2019-08-14T00:00:00"
LastImportDate(pin):"2019-08-13T00:00:00"
HasTransactionsWaitingForReview(pin):true
HasActivity(pin):true
DefaultPaymentMethodId(pin):4
PaymentMethod(pin):4
Modified(pin):"2019-03-11T19:32:32.573"
Created(pin):"2016-12-09T20:28:31.08"
ID(pin):208137

*/
