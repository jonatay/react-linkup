const ModelSimplePay = require('../../api/models/simplePay/ModelSimplePayEmployee');

ModelSimplePay.list().then(emps => {
  emps.forEach(emp => {
    if (emp.pay_point_id === 10015) {
      console.log(emp.last_name, ', ', emp.first_name);
      ModelSimplePay.update(emp.id, {
        last_name: emp.first_name,
        first_name: emp.last_name
      }).then(res => console.log(res));
    }
  });
});
