const callSageOneAPI = require("../../services/sageOne/sageOneApi");

exports.list = () => {
  return new Promise((resolve, reject) => {
    callSageOneAPI("BankAccount/Get", "get", {}, (err, data) =>
      err ? reject(err) : resolve(data.Results)
    );
  });
};
