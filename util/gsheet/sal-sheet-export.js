const GoogleSpreadsheet = require('google-spreadsheet');
const Promise = require('bluebird');
const moment = require('moment');
//const { dump } = require('dumper.js');
const async = require('async');
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
process.env.POSTGRES_CONNECT = 'postgres://postgres:dsa@burns:5432/linkup';
const db = require('../../api/services/postgres/db');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

const creds = require('./react-linkup-7e1d311f8387.json');

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
let googleFolderId = '0B7pigk77kinoVW5qTVlaMzNwYms';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Drive API.
  authorize(JSON.parse(content), listFiles);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function listFiles(auth) {
  google.drive({ version: 'v3', auth }).files.list(
    {
      auth: auth,
      orderBy: 'name desc',
      q: `name contains '-salary' and mimeType='application/vnd.google-apps.spreadsheet' and '${googleFolderId}' in parents`
    },
    (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      // console.log(res.data);
      const files = res.data.files;
      if (files.length) {
        processFileArray(files);
      } else {
        console.log('No files found.');
      }
    }
  );
}

const processFileArray = files => {
  console.log('processsing files count:', files.length);
  async.eachSeries(files, processFile, err => {
    if (err) {
      console.log('error:', err);
    }
    console.log('done');
  });
};

const processFile = (file, doneFile) => {
  const ownParseFloat = str =>
    str > ''
      ? parseFloat(str.replace(/,/g, '')) === NaN
        ? null
        : parseFloat(str.replace(/,/g, ''))
      : null;
  const getCellParams = { 'return-empty': true };
  let doc, sheetVar, sheetSc, sheetTc, sheetRc;
  let data;
  const sqlInsertUpdateSalSum = `
    INSERT INTO hr.sal_summ(
                emp_code, name, id_number, hired, bruto, bonus_mth, mibfa, 
                age, taxeable_income, tax_inc_annual, paye, uif, deductions, 
                pension, nett, hrs_worked, eti, p_yr, p_mth, source)
        VALUES ($[emp_code], $[name], $[id_number], $[hired], $[bruto], $[bonus_mth], $[mibfa], 
                $[age], $[taxeable_income], $[tax_inc_annual], $[paye], $[uif], $[deductions], 
                $[pension], $[nett], $[hrs_worked], $[eti], $[p_yr], $[p_mth], $[source])
    
    ON CONFLICT ON CONSTRAINT idx_unique DO UPDATE
    
       SET name=$[name], id_number=$[id_number], hired=$[hired], bruto=$[bruto], bonus_mth=$[bonus_mth], 
           mibfa=$[mibfa], age=$[age], taxeable_income=$[taxeable_income], tax_inc_annual=$[tax_inc_annual], 
           paye=$[paye], uif=$[uif], deductions=$[deductions], pension=$[pension], nett=$[nett], 
           hrs_worked=$[hrs_worked], eti=$[eti], source=$[source]
      
    RETURNING *;
`;
  console.log('procesing: ', file.name);

  async.series(
    [
      function setAuth(step) {
        doc = new GoogleSpreadsheet(file.id);
        doc.useServiceAccountAuth(creds, step);
      },
      function getSheets(step) {
        doc.getInfo((err, info) => {
          if (err) {
            step(err);
          }
          sheetVar = info.worksheets.find(ws => ws.title === 'var');
          sheetSc = info.worksheets.find(ws => ws.title === 'Sc');
          sheetTc = info.worksheets.find(ws => ws.title === 'Tc');
          sheetRc = info.worksheets.find(ws => ws.title === 'Rc');
          step(null, { sheetVar });
        });
      },
      function getVarData(step) {
        if (sheetVar) {
          sheetVar.getCells(getCellParams, (err, cells) => {
            if (err) {
              step(err);
            }
            data = {
              var: {
                [vars[0].colName]:
                  cells[
                    cells.findIndex(
                      ({ value }) => value === vars[0].sheetName
                    ) + 1
                  ].value,
                [vars[1].colName]:
                  cells[
                    cells.findIndex(
                      ({ value }) => value === vars[1].sheetName
                    ) + 1
                  ].value
              }
            };
            console.log('doneVar', data.var);
            step();
          });
        } else {
          data = { var: 'error - no var tab' };
          step();
        }
      },
      function getScData(step) {
        if (sheetSc) {
          sheetSc.getCells(getCellParams, (err, cells) => {
            if (err) {
              step(err);
            }
            let headerRow = -1;
            let tblData = [];
            row = {};
            for (let cell of cells) {
              if (cell.value === '#ERROR!') {
                step(`error-error found in ${cols[cell.col - 1].colName}`);
              }
              //console.log(cell.col, cell.row, cell.value);
              if (cell.value === cols[0].sheetName) {
                headerRow = cell.row;
              } else if (cell.value === 'xxx') {
                break;
              } else if (headerRow > 0 && cell.row > headerRow) {
                row[cols[cell.col - 1].colName] = cell.value;
                if (cell.col === cols.length) {
                  tblData.push(row);
                  row = {};
                }
              }
            }
            console.log('sc-data length:', tblData.length);
            data = { ...data, Sc: tblData };
            step();
          });
        } else {
          data = { ...data, Sc: 'error - no Sc tab' };
          step();
        }
      },
      function getTcData(step) {
        if (sheetTc) {
          sheetTc.getCells(getCellParams, (err, cells) => {
            if (err) {
              step(err);
            }
            let headerRow = -1;
            let tblData = [];
            row = {};
            for (let cell of cells) {
              if (cell.value === '#ERROR!') {
                step(`error-error found in ${cols[cell.col - 1].colName}`);
              }
              //console.log(cell.col, cell.row, cell.value);
              if (cell.value === cols[0].sheetName) {
                headerRow = cell.row;
              } else if (cell.value === 'xxx') {
                break;
              } else if (headerRow > 0 && cell.row > headerRow) {
                row[cols[cell.col - 1].colName] = cell.value;
                if (cell.col === cols.length) {
                  tblData.push(row);
                  row = {};
                }
              }
            }
            console.log('tc-data:', tblData.length);
            data = { ...data, Tc: tblData };
            step();
          });
        } else {
          data = { ...data, Tc: 'error - no Tc tab' };
          step();
        }
      },
      function getRcData(step) {
        if (sheetRc) {
          sheetRc.getCells(getCellParams, (err, cells) => {
            if (err) {
              step(err);
            }
            let headerRow = -1;
            let tblData = [];
            row = {};
            for (let cell of cells) {
              if (cell.value === '#ERROR!') {
                return step(
                  `error-error found in ${cols[cell.col - 1].colName}`
                );
              } else if (cell.value === 'Loading...') {
                return step(
                  `error-Loading... found in ${cols[cell.col - 1].colName}`
                );
              }
              //console.log(cell.col, cell.row, cell.value);
              else if (cell.value === cols[0].sheetName) {
                headerRow = cell.row;
              } else if (cell.value === 'xxx') {
                break;
              } else if (headerRow > 0 && cell.row > headerRow) {
                row[cols[cell.col - 1].colName] = cell.value;
                if (cell.col === cols.length) {
                  tblData.push(row);
                  row = {};
                }
              }
            }
            console.log('rc-data:', tblData.length);
            data = { ...data, Rc: tblData };
            step();
          });
        } else {
          data = { ...data, Rc: 'error - no Rc tab' };
          step();
        }
      },
      function insertDb(step) {
        Promise.map([...data.Sc, ...data.Tc, ...data.Rc], cRow =>
          db.one(sqlInsertUpdateSalSum, {
            ...cRow,
            ...data.var,
            id_number: cRow.id_number.replace("'", ''),
            bonus_mth: cRow.bonus_mth > '' ? parseInt(cRow.bonus_mth) : null,
            bruto: ownParseFloat(cRow.bruto),
            mibfa: ownParseFloat(cRow.mibfa),
            taxeable_income: ownParseFloat(cRow.taxeable_income),
            tax_inc_annual: ownParseFloat(cRow.tax_inc_annual),
            paye: ownParseFloat(cRow.paye),
            uif: ownParseFloat(cRow.uif),
            deductions: ownParseFloat(cRow.deductions),
            pension: ownParseFloat(cRow.pension),
            nett: ownParseFloat(cRow.nett),
            hrs_worked: ownParseFloat(cRow.hrs_worked),
            eti: ownParseFloat(cRow.eti),
            source: `node-gsheet-${moment().format('YY-MM-DD')}`
          })
        ).then(rwsSalSumm => {
          console.log(`db inserted rws: ${rwsSalSumm.length}`);
          step();
        });
      }
    ],
    err => {
      if (err) {
        doneFile(err);
      } else {
        //console.log('data', data);
        doneFile();
      }
    }
  );
};
