const { dump } = require('dumper.js');

const db = require('../../services/postgres/db');
const sqlListSDL = `
SELECT * FROM gl.ledger WHERE 
  cubit_company_code = ANY($[includeCccs]) AND
  cubit_description LIKE 'SDL%' AND
  accname = 'SDL Payable' AND
  edate BETWEEN $[dateFrom] AND $[dateTo]
`;

exports.listSDL = (includeCccs, dateFrom, dateTo) =>
  db.any(sqlListSDL, { includeCccs, dateFrom, dateTo });
//   .then(sdlLedgers => {
//   dump(sdlLedgers);
//   return sdlLedgers;
// });
