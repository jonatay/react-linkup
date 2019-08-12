const soap = require('strong-soap').soap;
const XMLHandler = soap.XMLHandler;
const xmlHandler = new XMLHandler();

const url = 'https://ws.sagepay.co.za/NIWS/NIWS_Validation.svc?singleWsdl';
const options = {};

const args = {
  ServiceKey: process.env.SAGE_PAY_ACCOUNT_SERVICE_KEY
};

exports.getBankList = () => {
  return new Promise((resolve, reject) => {
    soap.createClient(url, options, (err, client) => {
      if (err !== null) {
        return reject(err);
      }
      client.GetBankListWithDefaultBranchCode(args).then(({ result }) => {
        const { GetBankListWithDefaultBranchCodeResult } = result;
        //console.log(result);
        const {
          BankListResponse: { BankList }
        } = JSON.parse(
          JSON.stringify(
            xmlHandler.xmlToJson(
              null,
              GetBankListWithDefaultBranchCodeResult,
              null
            )
          )
        );
        return resolve(
          BankList.Bank.reduce(
            (bl, b) => [
              ...bl,
              { bank_name: b.BankName, default_code: b.DefaultCode }
            ],
            []
          )
        );
      });
    });
  });
};

exports.getBBranchList = () => {
  return new Promise((resolve, reject) => {
    soap.createClient(url, options, (err, client) => {
      if (err !== null) {
        return reject(err);
      }
      client
        .GetBranchList({
          ...args,
          BankName: '',
          BranchName: ''
        })
        .then(({ result }) => {
          const { GetBranchListResult } = result;
          const xml = GetBranchListResult.replace(/&/gi, '(ampandrepl)');
          const { Branch } = JSON.parse(
            JSON.stringify(
              xmlHandler.xmlToJson(null, xml, null).BranchListResponse
                .BranchList
            ).replace(/(ampandrepl)/gi, '&')
          );

          return resolve(
            Branch.map(br => ({
              branch_code: br.BranchCode,
              bank_name: br.BankName,
              branch_name: br.BranchName
            }))
          );
        });
    });
  });
};

exports.validateBankAccount = (branchCode, accountNumber, accountType) => {
  return new Promise((resolve, reject) => {
    soap.createClient(url, options, (err, client) => {
      if (err) {
        return reject(err);
      }
      client
        .ValidateBankAccount({
          ...args,
          BranchCode: branchCode,
          AccountNumber: accountNumber,
          AccountType: accountType
        })
        .then(({ result: { ValidateBankAccountResult } }) => {
          const r = parseInt(ValidateBankAccountResult, 10);
          return resolve({
            valid: r === 0,
            invalidBranchCode: r === 1,
            accNbrFailCDV: r === 2,
            invalidAccType: r === 3,
            inputDataIncorrect: r === 4,
            authFailed: r === 100,
            webFailed: r === 200
          });
        });
    });
  });
};
