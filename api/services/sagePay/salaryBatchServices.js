const soap = require('strong-soap').soap;
const XMLHandler = soap.XMLHandler;
const xmlHandler = new XMLHandler();

const url = 'https://ws.sagepay.co.za/NIWS/NIWS_NIF.svc?singleWsdl';
const options = {};

const args = {
  ServiceKey: process.env.SAGE_PAY_SALARY_SERVICE_KEY
};

exports.batchFileUpload = (data)
