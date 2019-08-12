const simplePayApi = require('../../services/simplePay/simplePayApi');

exports.list = () =>
  //get then dig each one out its own employee ref
  simplePayApi.getEmployees().then(emps => emps.map(e => e.employee));

exports.update = (id, data) => simplePayApi.updateEmployee(id, data);
