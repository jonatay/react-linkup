const { dump } = require('dumper.js');

const db = require('../../services/postgres/db');
const sqlListSdlUif = `
SELECT * FROM gl.ledger WHERE 
  cubit_company_code = ANY($[includeCccs]) 
  AND edate BETWEEN $[dateFrom] AND $[dateTo] 
  AND (
    (cubit_description LIKE 'SDL%' AND accname = 'SDL Payable')
    OR
    (cubit_description LIKE 'Company UIF Contribution%' AND accname = 'UIF Payable')
  )
ORDER BY cubit_id
`;

exports.listSdlUif = (includeCccs, dateFrom, dateTo) =>
  db.any(sqlListSdlUif, { includeCccs, dateFrom, dateTo });
//   .then(sdlLedgers => {
//   dump(sdlLedgers);
//   return sdlLedgers;
// });
