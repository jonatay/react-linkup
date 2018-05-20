const db = require('../../services/postgres/db');

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
