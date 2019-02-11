const salaryBatchServices = require('../../services/sagePay/salaryBatchServices');
const ModelSageBatch = require('../../models/sagePay/ModelSageBatch');
const ModelEmpSalary = require('../../models/hr/ModelEmpSalary');
const ModelCubitEmployee = require('../../models/cubit/ModelCubitEmployee');
const ModelSageAccount = require('../../models/sagePay/ModelSageAccount');
const moment = require('moment');
const fs = require('fs');

exports.list = (req, res) => {
  ModelSageBatch.list().then(sageBatches =>
    res.json({ status: 'list', sageBatches })
  );
};

// ModelEmpSalary.list(2019, 3).then(res =>
//   console.log(
//     res.reduce(
//       (re, i) => ({ total: re.total + i.pay_bank, count: re.count + 1 }),
//       { total: 0, count: 0 }
//     )
//   )
// );

const keysUpdate = [101, 102, 131, 132, 133, 134, 135, 136, 161, 202, 251];

const keysPay = [101, 102, 131, 132, 133, 134, 135, 136, 162, 202, 252];

exports.create = (
  {
    body: {
      params: {
        instruction,
        actionDate: action_date,
        taxYear: tax_year,
        taxMonth: tax_month
      }
    }
  },
  res
) => {
  //prep list of employees to pay, depending on instruction
  new Promise(
    (resolveEmpPayments, reject) =>
      instruction === 'Update'
        ? //if Update - take 'cubit' employee list
          ModelCubitEmployee.list().then(cEmps =>
            resolveEmpPayments(
              cEmps.map(cE => ({
                employee_code: cE.enum,
                amount: cE.basic_sal
              }))
            )
          )
        : //else use salary for specified tax period
          ModelEmpSalary.list(tax_year, tax_month).then(sEmps =>
            resolveEmpPayments(
              sEmps.map(sE => ({
                employee_code: sE.employee_code,
                amount: sE.pay_bank
              }))
            )
          )
  ).then(empPayments =>
    Promise.all(
      empPayments
        .sort(
          (a, b) =>
            a.employee_code > b.employee_code
              ? 1
              : a.employee_code < b.employee_code
                ? -1
                : 0
        )
        .map((empPay, index) =>
          ModelSageAccount.getByAccRef(empPay.employee_code).then(sageAcc => ({
            index,
            account_reference: sageAcc.acc_ref,
            account_name: sageAcc.name,
            banking_detail_type: 1,
            bank_account_name: sageAcc.acc_holders_name,
            bank_account_type: sageAcc.account_type,
            bank_account_branch: sageAcc.branch_code,
            filler: 0,
            bank_account_number: sageAcc.account_number,
            payment_amount: parseInt(empPay.amount * 100),
            mobile_number: sageAcc.mobile_number,
            beneficiary_statement_ref: sageAcc.beneficiary_ref
          }))
        )
    ).then(empTransactions =>
      // insert batch in DB
      ModelSageBatch.insert({
        batch_name:
          instruction === 'Update'
            ? `${instruction}`
            : `${instruction} for period ${tax_year}-${tax_month}`,
        instruction,
        action_date,
        keys: instruction === 'Update' ? keysUpdate : keysPay,
        tran_count: empTransactions.reduce(accum => accum + 1, 0),
        tran_sum: empTransactions.reduce(
          (accum, eT) => (accum += eT.payment_amount),
          0
        ),
        status_log: [`created ${moment().format('YYYY-MM-DD HH:mm')}`],
        tax_year: instruction === 'Update' ? null : tax_year,
        tax_month: instruction === 'Update' ? null : tax_month,
        batch_transactions: empTransactions.reduce(
          (accum, eT) => [...accum, JSON.stringify(eT)],
          []
        ),
        file_token: null,
        status: 'Created',
        submitted: null
      }).then(sageBatch => res.json({ status: 'created', sageBatch }))
    )
  );
};

exports.delete = ({ params: { id } }, res) =>
  ModelSageBatch.delete(id).then(() => res.json({ status: 'deleted', id }));

// ModelSageBatch.get(19).then(sageBatch => {
//   const file = salaryBatchServices.textifySageBatch(sageBatch);
//   fs.writeFileSync(__dirname + '../../../../files/sageSalFile.txt', file);
// });

exports.submitToSage = ({ params: { id } }, res) => {
  ModelSageBatch.get(id).then(sageBatch =>
    salaryBatchServices.sageBatchSubmit(sageBatch).then(sbSubmitRes =>
      ModelSageBatch.update(sageBatch.id, {
        ...sageBatch,
        submitted: new Date(),
        file_token: sbSubmitRes,
        status_log: [...sageBatch.status_log, { submitted: new Date() }],
        status: 'Submitted'
      }).then(sageBatch =>
        res.json({
          status: 'submitted',
          sageBatch: sageBatch
        })
      )
    )
  );

  // {
  //

  // });
};

exports.querySageStatus = ({ params: { id } }, res) =>
  ModelSageBatch.get(id).then(sageBatch =>
    res.json({ status: 'Queried', sageBatch })
  );
