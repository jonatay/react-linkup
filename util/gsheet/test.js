var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet('1p3UFR_qv4MdQla0Rmt8z8GumLABxOz9d__gmCkn2IIs');
var sheet, sheetVar;

const vars = [
  { colName: 'p_yr', sheetName: 'pYr' },
  { colName: 'p_mth', sheetName: 'pMth' }
];

const cols = [
  { colName: 'emp_code', sheetName: 'Emp #' },
  { colName: 'name', sheetName: 'Name' },
  { colName: 'id_number', sheetName: 'ID Number' },
  { colName: 'hired', sheetName: 'Hired' },
  { colName: 'bruto', sheetName: 'Bruto' },
  { colName: 'bonus_mth', sheetName: 'B' },
  { colName: 'mibfa', sheetName: 'mibfa' },
  { colName: 'age', sheetName: 'age' },
  { colName: 'taxeable_income', sheetName: 'lkp tax income' },
  { colName: 'tax_inc_annual', sheetName: 'x12' },
  { colName: 'paye', sheetName: 'paye' },
  { colName: 'uif', sheetName: 'uif' },
  { colName: 'deductions', sheetName: 'lkp deduc' },
  { colName: 'pension', sheetName: 'pension' },
  { colName: 'nett', sheetName: 'nett' },
  { colName: 'hrs_worked', sheetName: 'hrs wrked' },
  { colName: 'eti', sheetName: 'eti' }
];

async.series(
  [
    function setAuth(step) {
      // see notes below for authentication instructions!
      var creds = require('./react-linkup-7e1d311f8387.json');
      // OR, if you cannot save the file locally (like on heroku)
      // var creds_json = {
      //   client_email: 'yourserviceaccountemailhere@google.com',
      //   private_key: 'your long private key stuff here'
      // }

      doc.useServiceAccountAuth(creds, step);
    },
    function getInfoAndWorksheets(step) {
      doc.getInfo(function(err, info) {
        console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
        //console.log(info.worksheets)
        sheet = info.worksheets.find(ws => ws.title === 'Sc');
        sheetVar = info.worksheets.find(ws => ws.title === 'var');

        console.log(
          'sheet 1: ' +
            sheet.title +
            ' ' +
            sheet.rowCount +
            'x' +
            sheet.colCount
        );
        step();
      });
    },
    function workingWithRows(step) {
      // google provides some query options
      sheet.getRows(
        {
          offset: 0,
          limit: 100,
          orderby: 'Name'
        },
        function(err, rows) {
          // console.log('Read ' + rows.length + ' rows');
          // //console.log(rows);
          // for ({ _xml, _links, ...rest } of rows) {
          //   console.log(rest);
          // }

          // // the row is an object with keys set by the column headers
          // rows[0].colname = 'new val';
          // rows[0].save(); // this is async
          //
          // // deleting a row
          // rows[0].del();  // this is async

          step();
        }
      );
    },
    function workingWithCells(step) {
      sheet.getCells(
        {
          'return-empty': true
        },
        function(err, cells) {
          let headerRow = -1;
          let data = [];
          row = {};
          for (let cell of cells) {
            //console.log(cell.col, cell.row, cell.value);
            if (cell.value === cols[0].sheetName) {
              headerRow = cell.row;
            } else if (cell.value === 'xxx') {
              break;
            } else if (headerRow > 0 && cell.row > headerRow) {
              row[cols[cell.col - 1].colName] = cell.value;
              if (cell.col === cols.length) {
                data.push(row);
                row = {};
              }
            }
          }
          console.log(data);
          step();
        }
      );
    },
    function whatever(step) {
      sheetVar.getCells(
        {
          'return-empty': true
        },
        function(err, cells) {
          console.log({
            [vars[0].colName]:
              cells[
                cells.findIndex(({ value }) => value === vars[0].sheetName) + 1
              ].value,
            [vars[1].colName]:
              cells[
                cells.findIndex(({ value }) => value === vars[1].sheetName) + 1
              ].value
          });
          // console.log(cells);

          step();
        }
      );
    },
    function managingSheets(step) {
      // doc.addWorksheet({
      //   title: 'my new sheet'
      // }, function(err, sheet) {
      //   if (err) {
      //     console.log(err);
      //   }
      //
      //   // change a sheet's title
      //   sheet.setTitle('new title'); //async
      //
      //   //resize a sheet
      //   sheet.resize({rowCount: 50, colCount: 20}); //async
      //
      //   sheet.setHeaderRow(['name', 'age', 'phone']); //async
      //
      //   // removing a worksheet
      //   //sheet.del(); //async

      step();
      // });
    }
  ],
  function(err) {
    if (err) {
      console.log('Error: ' + err);
    }
  }
);
