const db = require('../../services/postgres/db');
const ModelEmployee = require('../hr/ModelEmployee');
const ModelSageBBranch = require('./ModelSageBBranch');
const sqlList = `
SELECT * FROM sage_pay.sage_accounts
`;

const sqlInsert = `
INSERT INTO sage_pay.sage_accounts(
            name, account_number, branch_code, bank_name, account_type, 
            cubit_account_type, employee_id, acc_ref, acc_holders_name, beneficiary_ref, 
            mobile_number, email_addr, sage_bank_id, sage_bbranch_id, jdata)
    VALUES ($[name], $[account_number], $[branch_code], $[bank_name], $[account_type], 
            $[cubit_account_type], $[employee_id], $[acc_ref], $[acc_holders_name], $[beneficiary_ref], 
            $[mobile_number], $[email_addr], 
            (SELECT id FROM sage_pay.sage_bank sb WHERE UPPER(sb.bank_name)=UPPER($[bank_name])), 
            (SELECT id FROM sage_pay.sage_branch sbr WHERE sbd.branch_code = $[branch_code]), 
            $[jdata])
ON CONFLICT ON CONSTRAINT sage_accounts_acc_ref_key DO
UPDATE 
   SET name=$[name], account_number=$[account_number], branch_code=$[branch_code], bank_name=$[bank_name], 
       account_type=$[account_type], cubit_account_type=$[cubit_account_type], employee_id=$[employee_id], 
       acc_ref=$[acc_ref], acc_holders_name=$[acc_holders_name], beneficiary_ref=$[beneficiary_ref], 
       mobile_number=$[mobile_number], email_addr=$[email_addr], 
       sage_bank_id=(SELECT id FROM sage_pay.sage_bank sba WHERE UPPER(sba.bank_name)=UPPER($[bank_name])), 
       sage_bbranch_id=(SELECT id FROM sage_pay.sage_branch sbr WHERE sbd.branch_code = $[branch_code]), 
       jdata=$[jdata]
RETURNING *              
`;

const sqlInsertFromBestImport = `
INSERT INTO sage_pay.sage_accounts(
            name, account_number, branch_code, 
            bank_name,
            acc_ref, acc_holders_name, beneficiary_ref, 
            mobile_number, email_addr, sage_bank_id, sage_bbranch_id)
    VALUES ($[creditor_name], $[acct_nbr], $[branch_nbr], 
            (SELECT bank_name FROM sage_pay.sage_bbranches WHERE branch_code = $[branch_nbr]), 
            $[lookup_code], $[creditor_name], $[statement_ref], 
            $[mobile_number], $[email_addr],
            (SELECT id FROM sage_pay.sage_banks sb WHERE UPPER(sb.bank_name)=(SELECT bank_name FROM sage_pay.sage_bbranches sbr WHERE sbr.branch_code = $[branch_nbr])), 
            (SELECT id FROM sage_pay.sage_bbranches sbr WHERE sbr.branch_code = $[branch_nbr]))
ON CONFLICT ON CONSTRAINT sage_accounts_acc_ref_key DO
UPDATE 
   SET jdata = $[jdata]
RETURNING *
`;

const sqlInsertFromCubitImport = `
INSERT INTO sage_pay.sage_accounts(
            name, account_number, branch_code, bank_name, account_type, 
            cubit_account_type, employee_id, acc_ref, acc_holders_name, beneficiary_ref, 
            mobile_number, email_addr, sage_bank_id, sage_bbranch_id
    ) VALUES (
            $[name], $[account_number], $[branch_code], $[bank_name], $[account_type], 
            $[cubit_account_type], $[employee_id], $[acc_ref], $[acc_holders_name], $[beneficiary_ref], 
            $[mobile_number], $[email_addr], $[sage_bank_id], $[sage_bbranch_id]
    )
ON CONFLICT ON CONSTRAINT sage_accounts_acc_ref_key DO
UPDATE 
   SET jdata = $[jdata]
RETURNING *  
`;

const sqlUpdate = `
UPDATE sage_pay.sage_accounts
   SET name=$[name], account_number=$[account_number], branch_code=$[branch_code], bank_name=$[bank_name], 
       account_type=$[account_type], cubit_account_type=$[cubit_account_type], employee_id=$[employee_id], 
       acc_ref=$[acc_ref], acc_holders_name=$[acc_holders_name], beneficiary_ref=$[beneficiary_ref], 
       mobile_number=$[mobile_number], email_addr=$[email_addr], 
       sage_bank_id=$[sage_bank_id], 
       sage_bbranch_id=$[sage_bbranch_id], 
       jdata=$[jdata]
 WHERE id=$[id]
 RETURNING *
`;

const sqlDelete = `
DELETE FROM sage_pay.sage_accounts WHERE id = $[id]
`;

exports.list = () => db.any(sqlList);

exports.insert = sageAccount => db.one(sqlInsert, sageAccount);

exports.update = (id, sageAccount) => db.one(sqlUpdate, { ...sageAccount, id });

exports.delete = id => db.none(sqlDelete, { id });

exports.insertBatch = data =>
  db.task(t => t.batch(data.map(d => t.one(sqlInsert, d))));

exports.insertBestBatch = data =>
  db.task(t =>
    t.batch(
      data.map(d =>
        t.one(sqlInsertFromBestImport, {
          ...d,
          mobile_number: d.notify_method === 'SMS' ? d.notify_detail : null,
          email_addr: d.notify_method === 'E-Mail' ? d.notify_detail : null,
          jdata: { ...d, updated: new Date() }
        })
      )
    )
  );

exports.insertCubitBatch = data =>
  db.task(t =>
    t.batch(
      data.map(d =>
        ModelEmployee.getByEmployeeCode(d.enum).then(emp =>
          ModelSageBBranch.getByBranchCode(d.bankcode).then(sbr =>
            t.one(sqlInsertFromCubitImport, {
              name: `${d.sname}, ${d.fnames}`,
              account_number: d.bankaccno,
              branch_code: d.bankcode,
              bank_name: d.bankname,
              account_type: d.bankacctype === 'Savings' ? 2 : 1,
              employee_id: emp.id,
              cubit_account_type: d.bankacctype,
              acc_ref: d.enum,
              acc_holders_name: `${d.sname}, ${d.fnames}`,
              beneficiary_ref: 'Link-Up Security Salary',
              mobile_number: d.telno,
              email_addr: d.email,
              sage_bank_id: sbr.sage_bank_id,
              sage_bbranch_id: sbr.id,
              jdata: { ...d, updated: new Date() }
            })
          )
        )
      )
    )
  );

/*
1 = Current / Checking
2 = Savings
3 = Transmission
4 = Bond
 */
//   console.log(
//     data.map(d => ({
//       smane: d.sname,
//       fnames: d.fnames,
//       enum: d.enum,
//       bankname: d.,
//       bankcode: d.,
//       bankacctype: d.,
//       bankaccno: d.
//     }))
//   );
// });
exports.fillFromBestCreditor = bestCreditor => ({
  name: bestCreditor.creditor_name,
  account_number: bestCreditor.acct_nbr,
  branch_code: bestCreditor.branch_nbr,
  bank_name: null,
  account_type: null,
  cubit_account_type: null,
  employee_id: null,
  acc_ref: bestCreditor.lookup_code,
  acc_holders_name: bestCreditor.creditor_name,
  beneficiary_ref: bestCreditor.statement_ref,
  mobile_number:
    bestCreditor.notify_method === 'SMS' ? bestCreditor.notify_detail : null,
  email_addr:
    bestCreditor.notify_method === 'E-Mail' ? bestCreditor.notify_detail : null
});
