const db = require('../../services/postgres/db');

const sqlList = `
SELECT * FROM sage_pay.sage_banks
`;

const sqlInsert = `
INSERT INTO sage_pay.sage_banks(bank_name, default_code)
    VALUES ($[bank_name], $[default_code])
ON CONFLICT ON CONSTRAINT sage_banks_bank_name_key DO
UPDATE SET bank_name=$[bank_name], default_code=$[default_code]
RETURNING *
`;

exports.list = () => db.any(sqlList);

exports.insert = sageBank => db.one(sqlInsert, sageBank);

exports.insertBatch = data =>
  db.task(t => t.batch(data.map(d => t.one(sqlInsert, d))));
