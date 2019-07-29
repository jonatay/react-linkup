const db = require('../../services/postgres/db');

const sqlList = `
SELECT * FROM hr.employee
`;

const sqlGetByEmployeeCode = `
SELECT * FROM hr.employee WHERE employee_code = $[employeeCode]
`;

const sqlUpdateTaxRefNbr = `
UPDATE hr.employee e
SET tax_reference_number = $[taxReferenceNumber]
FROM hr.employee o
WHERE e.id = o.id
AND e.employee_code = $[employeeCode]
RETURNING 
  o.employee_code, 
  e.tax_reference_number,
  o.tax_reference_number AS old_tax_reference_number, 
  o.surname || ', ' || o.first_names AS name
`;
/*

UPDATE tbl x
SET    tbl_id = 23
     , name = 'New Guy'
FROM   tbl y                -- using the FROM clause
WHERE  x.tbl_id = y.tbl_id  -- must be UNIQUE NOT NULL
AND    x.tbl_id = 3
RETURNING y.tbl_id AS old_id, y.name AS old_name
        , x.tbl_id          , x.name;

 */

exports.list = () => db.any(sqlList);

exports.getByEmployeeCode = employeeCode =>
  db
    .any(sqlGetByEmployeeCode, { employeeCode })
    .then(data => (data.length === 1 ? data[0] : null));

exports.updateTaxRefNbr = (employeeCode, taxReferenceNumber) =>
  db.one(sqlUpdateTaxRefNbr, { employeeCode, taxReferenceNumber });
