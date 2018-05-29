const db = require('../../services/postgres/db');

const sqlList = `
SELECT * FROM sage_pay.sage_batches
`;

const sqlGet = `
SELECT * FROM sage_pay.sage_batches WHERE id=$[id]
`;

const sqlInsert = `
INSERT INTO sage_pay.sage_batches(
            batch_name, instruction, action_date, keys, tran_count, tran_sum, 
            status_log, tax_year, tax_month, batch_transactions, file_token, status, submitted)
    VALUES ($[batch_name], $[instruction], $[action_date], $[keys], $[tran_count], $[tran_sum], 
            $[status_log], $[tax_year], $[tax_month], $[batch_transactions], $[file_token], $[status], 
            $[submitted])
RETURNING *
`;

const sqlUpdate = `
UPDATE sage_pay.sage_batches
   SET batch_name=$[batch_name], instruction=$[instruction], action_date=$[action_date], keys=$[keys], 
        tran_count=$[tran_count], tran_sum=$[tran_sum], status_log=$[status_log], tax_year=$[tax_year], 
        tax_month=$[tax_month], batch_transactions=$[batch_transactions], file_token=$[file_token], 
        status=$[status], submitted=$[submitted]
 WHERE id=$[id]
 RETURNING *
`;

const sqlDelete = `
DELETE FROM sage_pay.sage_batches WHERE id=$[id]
`;

exports.list = () => db.any(sqlList);

exports.get = id => db.one(sqlGet, { id });

exports.insert = sageBatch => db.one(sqlInsert, sageBatch);

exports.update = (id, sageBatch) => db.one(sqlUpdate, { ...sageBatch, id });

exports.delete = id => db.none(sqlDelete, { id });
