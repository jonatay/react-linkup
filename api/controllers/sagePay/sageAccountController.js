const accountServices = require('../../services/sagePay/accountServices');

const ModelSageAccount = require('../../models/sagePay/ModelSageAccount');
const ModelCubitEmployee = require('../../models/cubit/ModelCubitEmployee');
const ModelEmployee = require('../../models/hr/ModelEmployee');
const ModelSageBBranch = require('../../models/sagePay/ModelSageBBranch');

exports.list = (req, res) => {
  ModelSageAccount.list().then(data =>
    res.json({ status: 'list', sageAccounts: data })
  );
};

exports.listEmp = (req, res) => {
  ModelSageAccount.listEmp().then(data =>
    res.json({ status: 'list', sageAccounts: data })
  );
};

getChanges = (sageAccount, newSageAcc) =>
  Object.keys(sageAccount).reduce((accum, key) => {
    if (key !== 'changes' && sageAccount[key] !== newSageAcc[key]) {
      accum[key] = sageAccount[key];
    }
    return accum;
  }, {});

const convCubitEmpl = (cubitEmpl, employee, sageBBranch, sageAccount) => {
  const ret = {
    name: `${cubitEmpl.sname}, ${cubitEmpl.fnames}`,
    account_number: cubitEmpl.bankaccno,
    branch_code: cubitEmpl.bankcode,
    bank_name: cubitEmpl.bankname,
    account_type: cubitEmpl.bankacctype === 'Savings' ? 2 : 1,
    cubit_account_type: cubitEmpl.bankacctype,
    employee_id: employee ? employee.id : null,
    acc_ref: cubitEmpl.enum,
    acc_holders_name: `${cubitEmpl.sname}, ${cubitEmpl.fnames}`,
    beneficiary_ref: 'Link-Up Security Salary',
    mobile_number: cubitEmpl.telno.trim(),
    email_addr: cubitEmpl.email.trim(),
    sage_bank_id: sageBBranch ? sageBBranch.sage_bank_id : null,
    sage_bbranch_id: sageBBranch ? sageBBranch.id : null,
    jdata: null,
    pay_limit: null,
    id: sageAccount ? sageAccount.id : null,
    validated: null
  };
  if (sageAccount && !sageAccount.changes) {
    sageAccount.changes = [];
  }
  return {
    ...ret,
    changes: sageAccount
      ? [
          ...sageAccount.changes,
          {
            whenChanged: new Date(),
            changedFrom: getChanges(sageAccount, ret)
          }
        ]
      : [{ whenCreated: new Date() }]
  };
};

exports.importCubit = (req, res) => {
  // ModelCubitEmployee.list().then(ce =>
  //   ModelSageAccount.insertCubitBatch(ce).then(sageAccounts =>
  //     res.json({ status: 'import-cubit', sageAccounts })
  //   )
  // );
  ModelCubitEmployee.list().then(cubitEmployees =>
    Promise.all(
      cubitEmployees.map(cubitEmpl =>
        ModelEmployee.getByEmployeeCode(cubitEmpl.enum).then(employee =>
          ModelSageBBranch.getByBranchCode(cubitEmpl.bankcode).then(
            sageBBranch =>
              ModelSageAccount.getByAccRef(cubitEmpl.enum).then(sageAccount => {
                const newSAcc = convCubitEmpl(
                  cubitEmpl,
                  employee,
                  sageBBranch,
                  sageAccount
                );
                if (!sageAccount) {
                  return ModelSageAccount.insert(newSAcc);
                } else {
                  if (sageAccount.account_number !== newSAcc.account_number) {
                    return ModelSageAccount.update(sageAccount.id, {
                      ...sageAccount,
                      jdata: {
                        update: {
                          account_number: newSAcc.account_number,
                          branch_code: newSAcc.branch_code,
                          account_type: newSAcc.account_type
                        }
                      }
                    });
                  } else return sageAccount; //ModelSageAccount.update(sageAccount.id, newSAcc);
                }
              })
          )
        )
      )
    ).then(data => res.json({ status: 'import-cubit', sageAccounts: data }))
  );
};

/*
acct_nbr:"0000040795381"
best_status:"RELEASED"
best_status_code:"RL"
branch_nbr:"055433"
creditor_name:"DREYKON 3449"
lookup_code:"3449-DREYKON"
notify_detail:"john@dreykon.co.za"
notify_method:"E-Mail"
pay_limit:5000
statement_ref:"LINK-UP TECHNICAL"
 */
const convBestCreditor = (bestCreditor, employee, sageBBranch, sageAccount) => {
  const ret = {
    name: employee
      ? `${employee.surname}, ${employee.first_names}`
      : bestCreditor.creditor_name,
    account_number: bestCreditor.acct_nbr,
    branch_code: bestCreditor.branch_nbr,
    bank_name: sageBBranch ? sageBBranch.bank_name : null,
    account_type: sageAccount ? sageAccount.account_type : 1,
    cubit_account_type: sageAccount ? sageAccount.cubit_account_type : null,
    employee_id: employee ? employee.id : null,
    acc_ref: bestCreditor.lookup_code,
    acc_holders_name: bestCreditor.creditor_name,
    beneficiary_ref: employee
      ? 'Link-Up Security Salary'
      : bestCreditor.statement_ref,
    mobile_number:
      bestCreditor.notify_method === 'SMS' ? bestCreditor.notify_detail : null,
    email_addr:
      bestCreditor.notify_method === 'E-Mail'
        ? bestCreditor.notify_detail
        : null,
    sage_bank_id: sageBBranch ? sageBBranch.sage_bank_id : null,
    sage_bbranch_id: sageBBranch ? sageBBranch.id : null,
    jdata: null,
    pay_limit: bestCreditor.pay_limit,
    id: sageAccount ? sageAccount.id : null,
    validated: null
  };
  if (sageAccount && !sageAccount.changes) {
    sageAccount.changes = [];
  }
  return {
    ...ret,
    changes: sageAccount
      ? [
          ...sageAccount.changes,
          {
            whenChanged: new Date(),
            changedFrom: getChanges(sageAccount, ret)
          }
        ]
      : [{ whenCreated: new Date() }]
  };
};

exports.importBest = (req, res) => {
  const { bestCreditors } = req.body;
  Promise.all(
    bestCreditors.map(bestCreditor =>
      ModelEmployee.getByEmployeeCode(bestCreditor.lookup_code).then(employee =>
        ModelSageBBranch.getByBranchCode(bestCreditor.branch_nbr).then(
          sageBBranch =>
            ModelSageAccount.getByAccRef(bestCreditor.lookup_code).then(
              sageAccount => {
                const newSAcc = convBestCreditor(
                  bestCreditor,
                  employee,
                  sageBBranch,
                  sageAccount
                );
                if (!sageAccount) {
                  return ModelSageAccount.insert(newSAcc);
                } else {
                  return ModelSageAccount.update(sageAccount.id, newSAcc);
                }
              }
            )
        )
      )
    )
  ).then(data => res.json({ status: 'import-cubit', sageAccounts: data }));
};

exports.create = (req, res) => {
  res.json({ status: 'not_implemented', sageAccount: {} });
};

exports.update = (req, res) => {
  res.json({ status: 'not_implemented', sageAccount: {} });
};

exports.delete = (req, res) => {
  res.json({ status: 'not_implemented', id: null });
};

exports.validateSageAccount = (req, res) => {
  const id = req.params.id;
  ModelSageAccount.get(id).then(sageAccount =>
    accountServices
      .validateBankAccount(
        sageAccount.branch_code,
        sageAccount.account_number,
        sageAccount.account_type ? sageAccount.account_type : 1
      )
      .then(validationResult => {
        if (validationResult.valid) {
          sageAccount.validated = new Date();
          ModelSageAccount.update(id, sageAccount).then(
            res.json({
              status: 'validate-sucess',
              sageAccount,
              validationResult
            })
          );
        } else {
          res.json({
            status: 'validate-fail',
            sageAccount,
            validationResult
          });
        }
      })
  );
};
