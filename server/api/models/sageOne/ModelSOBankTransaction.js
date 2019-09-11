const callSageOneAPI = require("../../services/sageOne/sageOneApi");

exports.list = (filter, page) => {
  return new Promise((resolve, reject) => {
    callSageOneAPI(
      {
        endpoint: "BankTransaction/Get",
        method: "get",
        filter: filter.filter,
        fromDate: filter.dateFrom,
        toDate: filter.dateTo
      },
      (err, data) => (err ? reject(err) : resolve(data.Results))
    );
  });
};
