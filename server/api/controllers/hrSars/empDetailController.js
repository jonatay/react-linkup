const Promise = require('bluebird');

const ModelEmpDetail = require('../../models/hrSars/ModelEmpDetail');
const ModelEmployee = require('../../models/hr/ModelEmployee');

exports.list = (req, res) => {
  ModelEmpDetail.list().then(data =>
    res.json({ status: 'list', empDetails: data })
  );
};

exports.importEasyfile = async (req, res) => {
  const { data } = req.body;
  //console.log(data);
  const result = { company: '', emps: [], unknown: [] };
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (row['2010']) {
      //Head
      result.company = `${row['2010']} (Ref:${row['2020']})`;
    } else if (row['3100']) {
      //got tax ref
      const certNbr = row['3010'];
      const empCode = certNbr.substring(25);
      const taxRef = row['3100'];
      const updRes = await ModelEmployee.updateTaxRefNbr(empCode, taxRef);
      result.emps.push({
        certNbr,
        ...updRes
      });
    } else {
      result.unknown.push(row);
    }
  }
  res.json({ result });
};
