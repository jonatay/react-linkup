const db = require('../../services/postgres/db');

const sqlList = `
SELECT * FROM sage_pay.sage_accounts
`;

const sqlListEmp = `
SELECT * FROM sage_pay.sage_accounts WHERE employee_id IS NOT NULL
`;

const sqlGet = `
SELECT * FROM sage_pay.sage_accounts WHERE id = $[id]
`;

const sqlGetByAccRef = `
SELECT * FROM sage_pay.sage_accounts WHERE acc_ref = $[accRef]
`;

const sqlInsert = `
INSERT INTO sage_pay.sage_accounts(
            name, account_number, branch_code, bank_name, account_type, 
            cubit_account_type, employee_id, acc_ref, acc_holders_name, beneficiary_ref, 
            mobile_number, email_addr, sage_bank_id, sage_bbranch_id, changes)
    VALUES ($[name], $[account_number], $[branch_code], $[bank_name], $[account_type], 
            $[cubit_account_type], $[employee_id], $[acc_ref], $[acc_holders_name], $[beneficiary_ref], 
            $[mobile_number], $[email_addr], $[sage_bank_id], $[sage_bbranch_id], $[changes])
RETURNING *              
`;

const sqlUpdate = `
UPDATE sage_pay.sage_accounts
   SET name=$[name], account_number=$[account_number], branch_code=$[branch_code], bank_name=$[bank_name], 
       account_type=$[account_type], cubit_account_type=$[cubit_account_type], employee_id=$[employee_id], 
       acc_ref=$[acc_ref], acc_holders_name=$[acc_holders_name], beneficiary_ref=$[beneficiary_ref], 
       mobile_number=$[mobile_number], email_addr=$[email_addr], sage_bank_id=$[sage_bank_id], 
       sage_bbranch_id=$[sage_bbranch_id], changes=$[changes], validated=$[validated], jdata=$[jdata]
 WHERE id=$[id]
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

const sqlDelete = `
DELETE FROM sage_pay.sage_accounts WHERE id = $[id]
`;

exports.list = () => db.any(sqlList);

exports.listEmp = () => db.any(sqlListEmp);

exports.get = id => db.one(sqlGet, { id });

exports.getByAccRef = accRef =>
  db
    .any(sqlGetByAccRef, { accRef })
    .then(data => (data.length === 1 ? data[0] : null));

exports.insert = sageAccount => db.one(sqlInsert, sageAccount);

exports.update = (id, sageAccount) => db.one(sqlUpdate, { ...sageAccount, id });

exports.delete = id => db.none(sqlDelete, { id });

exports.insertBatch = data =>
  db.task(t => t.batch(data.map(d => t.one(sqlInsert, d))));
