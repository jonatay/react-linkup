const GoogleSpreadsheet = require('google-spreadsheet');
const Promise = require('bluebird');
const { dump } = require('dumper.js');

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

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

const getCellParams = { 'return-empty': true };
function listFiles(auth) {
  const list = Promise.promisify(
    google.drive({ version: 'v3', auth }).files.list
  );
  list({
    auth: auth,
    q: `name contains '-salary' and mimeType='application/vnd.google-apps.spreadsheet' and '${googleFolderId}' in parents`
  }).then(({ data: { files } }) =>
    Promise.map(files, file => {
      console.log(file.name);
      const doc = new GoogleSpreadsheet(file.id);
      const useServiceAccountAuth = Promise.promisify(
        doc.useServiceAccountAuth
      );
      useServiceAccountAuth(creds).then(() => {
        const getInfo = Promise.promisify(doc.getInfo);
        getInfo().then(({ worksheets }) => {
          if (!worksheets.find(ws => ws.title === 'Sc')) {
            return null;
          }
          const cellsVar = Promise.promisify(
            worksheets.find(ws => ws.title === 'var').getCells
          );
          const cellsSc = Promise.promisify(
            worksheets.find(ws => ws.title === 'Sc').getCells
          );
          return cellsSc
            ? Promise.map(
                [
                  cellsVar().then(cells => ({
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
                  })),
                  cellsSc().then(cells => {
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
                    return data;
                  })
                ],
                data => ({ data })
              )
            : null;
        });
      });
    }).then(data => {
      //console.log(data);
    })
  );
}

// function listFiles(auth) {
//   const drive = google.drive({ version: 'v3', auth });
//   drive.files.list(

//     (err, res) => {
//       if (err) return console.log('The API returned an error: ' + err);
//       //console.log(res.data);
//       const files = res.data.files;
//       // dump(files);
//       if (files.length) {
//         Promise.map(files, file => {
//
//           doc.useServiceAccountAuth(creds, () => {
//             doc.getInfo(function(err, info) {
//               console.log('Loaded doc: ' + info.title);
//               //console.log(info.worksheets)
//               return shtSc
//                 ? Promise.map(
//                     [
//                       shtSc.getCells(getCellParams, (err, cells) => {
//                         let headerRow = -1;
//                         const data = [];
//                         row = {};
//                         for (let cell of cells) {
//                           //console.log(cell.col, cell.row, cell.value);
//                           if (cell.value === cols[0].sheetName) {
//                             headerRow = cell.row;
//                           } else if (cell.value === 'xxx') {
//                             break;
//                           } else if (headerRow > 0 && cell.row > headerRow) {
//                             row[cols[cell.col - 1].colName] = cell.value;
//                             if (cell.col === cols.length) {
//                               data.push(row);
//                               row = {};
//                             }
//                           }
//                         }
//                         return { secCalc: data };
//                       })
//                     ],
//                     data => data
//                   )
//                 : null;
//             });
//           });
//         }).then(data => console.log(data));
//       } else {
//         console.log('No files found.');
//       }
//     }
//   );
// }
