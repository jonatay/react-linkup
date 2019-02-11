const Promise = require('bluebird');
const cubitDbs = require('../../services/postgres/cubit_dbs');

const sqlGet = `
SELECT compname, slogan, logoimg, addr1, addr2, addr3, addr4, paddr1, 
       paddr2, paddr3, pcode, tel, fax, vatnum, regnum, 
       div, paye, terms, postcode, diplomatic_indemnity, 
       sdl, uif
  FROM cubit.compinfo
`;
//excluded : imgtype, img, img2, imgtype2, logoimg2,
const sqlGetByCompanyCode = `

SELECT * FROM cubit.compinfo
FETCH FIRST 1 ROW ONLY 
`;

exports.list = () =>
  Promise.map(cubitDbs, cdb =>
    cdb.db.one(sqlGet).then(row => ({ ...row, ccc: cdb.ccc }))
  );

exports.get = ccc =>
  cubitDbs
    .find(cdb => cdb.ccc === ccc)
    .db.one(sqlGet) // return with ccc
    .then(row => ({ ...row, ccc }));
//
// exports.getByCompanyCode = (ccc) => cubitDbs
