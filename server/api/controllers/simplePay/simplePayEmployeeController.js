const ModelSimplePayEmployee = require('../../models/simplePay/ModelSimplePayEmployee');

exports.list = (req, res) => {
  ModelSimplePayEmployee.list().then(spEmployees => {
    res.json({ spEmployees });
  });
};
