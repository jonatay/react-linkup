const db = require('../../services/postgres/db');

const sqlList = `
SELECT * FROM sage_pay.sage_bbranches
`;

const sqlGetByBranchCode = `
SELECT * FROM sage_pay.sage_bbranches WHERE branch_code = $[branchCode]
`;

const sqlInsert = `
INSERT INTO sage_pay.sage_bbranches(
            branch_code, bank_name, branch_name, sage_bank_id)
    VALUES ($[branch_code], $[bank_name], $[branch_name], 
            (SELECT id FROM sage_pay.sage_banks WHERE UPPER(bank_name) = UPPER($[bank_name]))
    )
    
ON CONFLICT ON CONSTRAINT sage_bbranches_bank_name_branch_code_key DO

UPDATE SET branch_code=$[branch_code], bank_name=$[bank_name], 
           branch_name=$[branch_name], 
           sage_bank_id=(SELECT id FROM sage_pay.sage_banks WHERE UPPER(bank_name) = UPPER($[bank_name]))

RETURNING *
`;

exports.list = () => db.any(sqlList);

exports.getByBranchCode = branchCode =>
  db
    .any(sqlGetByBranchCode, { branchCode })
    .then(data => (data.length === 1 ? data[0] : null));

exports.insert = sageBBranch => db.one(sqlInsert, sageBBranch);

exports.insertBatch = data =>
  db.task(t => t.batch(data.map(d => t.one(sqlInsert, d))));
