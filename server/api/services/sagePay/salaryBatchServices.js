const soap = require('strong-soap').soap;
const XMLHandler = soap.XMLHandler;
const xmlHandler = new XMLHandler();
const moment = require('moment');

const url = 'https://ws.sagepay.co.za/NIWS/NIWS_NIF.svc?singleWsdl';
const options = {};

const args = {
  ServiceKey: process.env.SAGE_PAY_SALARY_SERVICE_KEY
};

const padLeft = (nr, n, str) =>
  Array(n - String(nr).length + 1).join(str || '0') + nr;

exports.textifySageBatch = sageBatch =>
  `H\t${process.env.SAGE_PAY_SALARY_SERVICE_KEY}\t1\t${
    sageBatch.instruction
  }\t${sageBatch.batch_name}\t${moment(sageBatch.action_date).format(
    'YYYYMMDD'
  )}\t24ade73c-98cf-47b3-99be-cc7b867b3080
K\t${sageBatch.keys.join('\t')}
${sageBatch.batch_transactions
    .map(sbt => JSON.parse(sbt))
    .map(
      bt =>
        `T\t${bt.account_reference}\t${bt.account_name}\t${
          bt.banking_detail_type
        }\t${bt.bank_account_name}\t${bt.bank_account_type}\t${
          bt.bank_account_branch
        }\t${bt.filler}\t${padLeft(
          parseInt(bt.bank_account_number, 10),
          11
        )}\t${bt.payment_amount}\t${bt.mobile_number}\t${
          bt.beneficiary_statement_ref
        }`
    )
    .join('\n')}
F\t${sageBatch.tran_count}\t${sageBatch.tran_sum}\t9999`;

exports.sageBatchSubmit = sageBatch =>
  new Promise((resolve, reject) =>
    soap.createClient(
      url,
      options,
      (err, client) =>
        err
          ? reject(err)
          : client
              .BatchFileUpload({
                ...args,
                File: this.textifySageBatch(sageBatch)
              })
              .then(
                ({ result }) => {
                  const { BatchFileUploadResult } = result;
                  console.log(BatchFileUploadResult);
                  return resolve(BatchFileUploadResult);
                },
                err => reject(err)
              )
    )
  );
