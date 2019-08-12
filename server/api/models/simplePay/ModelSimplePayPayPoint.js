const simplePayApi = require('../../services/simplePay/simplePayApi');

exports.list = () =>
  //get then dig each one out its own employee ref
  simplePayApi
    .getPayPoints()
    .then(emps => emps.map(e => e.pay_point).filter(e => !e.deleted));
