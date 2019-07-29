const rp = require('request-promise');
//var _ = require('underscore');

var options = {
  headers: {
    Authorization: process.env.SIMPLEPAY_API_KEY,
    'Content-Type': 'application/json'
  },
  json: true
};

exports.getEmployees = () => {
  return rp({
    ...options,
    uri: `https://www.simplepay.co.za/api/v1/clients/${
      process.env.SIMPLEPAY_CLIENT_ID
    }/employees`
  });
};

exports.updateEmployee = (id, data) => {
  return rp({
    ...options,
    uri: `https://www.simplepay.co.za/api/v1/employees/${id}`,
    method: 'PATCH',
    body: data
  });
};

exports.getPayPoints = () => {
  return rp({
    ...options,
    uri: `https://www.simplepay.co.za/api/v1/clients/${
      process.env.SIMPLEPAY_CLIENT_ID
      }/pay_points`
  });
};
//console.log('geeeetting...');

//getEmployees().then(emps => console.log('Got emps - ', emps.length));

// return new Promise((resolve, reject) => {
//   const req = https.request(
//     {
//       ...options,
//       path: `/api/v1/clients/${process.env.SIMPLEPAY_CLIENT_ID}/employees`
//     },
//     res => {
//       console.log(`STATUS: ${res.statusCode}`);
//       //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//       res.setEncoding('utf8');
//       res.on('data', chunk => {
//         console.log(`BODY: ${chunk}`);
//       });
//       res.on('end', () => {
//         console.log('No more data in response.');
//       });
//     }
//   );
//   req.on('error', e => {
//     console.error(`problem with request: ${e.message}`);
//   });
//
//   // Write data to request body
//   //req.write(postData);
//   req.end();
// });
