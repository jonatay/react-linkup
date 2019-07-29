/*
    Jono : 19 01 30
    Emp501Create : Stateless Functional Component
*/
import React, { Component } from 'react';
import { Button, Col, Row, Select } from 'antd';
import Emp501Import from '../../../components/hr-sars/emp-501-import';
import Emp501EfilingExport from '../emp-501-easyfile-import';
import Emp501CreateForm from '../emp-501-create-form';
const { Option } = Select;

const getEmp501Create = ({
  submitCompany,
  includeCompanies,
  cubitCompanies,
  taxYear,
  taxMonth,
  period
}) => {
  const cubitCompany = cubitCompanies.find(cc => cc.ccc === submitCompany);
  //console.log(cubitCompany);
  let aPeriod = period.split('-');
  return cubitCompany
    ? {
        description: `${period} ${
          cubitCompany.compname
        } [${includeCompanies.join(', ')}]`,
        tradingName: cubitCompany.compname,
        submitCcc: cubitCompany.ccc,
        includeCccs: includeCompanies.join(','),
        taxYear,
        taxMonth,
        period: aPeriod.join(''),
        dateFrom:
          (aPeriod[1] === '02' ? aPeriod[0] - 1 : aPeriod[0]) + '-03-01',
        dateTo: aPeriod[0] + (aPeriod[1] === '02' ? '-02-28' : '-08-31'),
        testLive: 'Live',
        refPAYE: cubitCompany.paye,
        refSDL: cubitCompany.sdl,
        refUIF: cubitCompany.uif,
        contactFName: 'Jonathan',
        contactSName: 'Taylor',
        contactPos: 'Member',
        contactCNumber: '0836081713',
        contactEMail: 'jono@linkupsecurity.co.za',
        payrollSWProv: 'In-house',
        payrollSWPkg: 'In-house',
        empSIC7: '80100',
        empTradeClas: '2570',
        diplomaticImmunity: false,
        empAddrStreetNbr: 220,
        empAddrStreetName: 'Market',
        empAddrTown: 'Vryheid',
        empAddrPCode: 3100,
        empAddrCCode: 'ZA'
      }
    : {};
};

//setup periods & period options TODO: Get EMP501 Periods from server
const currY = new Date().getFullYear();
const periods = [];
for (let i = 0; i < 10; i++) {
  periods.push(currY - i + '-08');
  periods.push(currY - i + '-02');
}
const periodOptions = periods.map(p => <Option key={p}>{p}</Option>);

// setup cubit companies and options, TODO: Get Emp501 Companies from server
const coys = [
  { name: 'Security', code: 'aaab' },
  { name: 'Technical', code: 'aaac' },
  { name: 'Reaction', code: 'aaad' }
];
const companyOptions = coys.map(c => <Option key={c.code}>{c.name}</Option>);

const Emp501Create = class Emp501Create extends Component {
  state = {
    submitCompany: 'aaab',
    includeCompanies: ['aaab', 'aaac', 'aaad'],
    period: '2018-08',
    importEmpVisible: false,
    createEmpVisible: false,
    importEasyfileVisible: false
  };
  handleEmp501Upload(data) {
    //console.log(data);
    this.props.importEmpMaster(data);
    this.setState({ importEmpVisible: false });
  }
  handleEmp501EfilingUpload(data) {
    //console.log(data);
    this.props.importEmpEasyfile(data);
    this.setState({ importEasyfileVisible: false });
  }
  handleEmp501Create(data) {
    //console.log(data);
    this.props.createEmpMaster(data);
    this.setState({ createEmpVisible: false });
  }

  handleCreateReturn() {
    // const { submitCompany, includeCompanies, period, testLive } = this.state;
    // this.props.createEmpMaster({
    //   submitCompany,
    //   includeCompanies,
    //   period,
    //   testLive
    // });
    this.setState({ createEmpVisible: true });
  }
  render() {
    const { period, includeCompanies, submitCompany } = this.state;
    let aPeriod = period.split('-');
    return (
      <div>
        {' '}
        <Row>
          <Col span={2}>
            <Select
              placeholder="period"
              style={{ width: '100%' }}
              onChange={val =>
                this.setState({
                  period: val,
                  taxYear:
                    val.substring(5, 7) === '02'
                      ? val.substring(0, 4) - 0
                      : val.substring(0, 4) - 0 + 1,
                  taxMonth: val.substring(5, 7)
                })
              }
              value={period}
            >
              {periodOptions}
            </Select>
          </Col>
          <Col span={2}>
            <Select
              placeholder="submit company"
              style={{ width: '100%' }}
              onChange={val => this.setState({ submitCompany: val })}
              value={submitCompany}
            >
              {companyOptions}
            </Select>
          </Col>
          <Col span={6}>
            <Select
              placeholder="company(s)"
              mode="multiple"
              style={{ width: '100%' }}
              onChange={val => this.setState({ includeCompanies: val })}
              value={includeCompanies}
            >
              {companyOptions}
            </Select>
          </Col>
          <Col span={3}>
            <Button
              type="primary"
              icon="plus-square"
              onClick={e => this.handleCreateReturn()}
              disabled={includeCompanies.length === 0}
            >
              Create Return
            </Button>
          </Col>
          <Col span={4}>
            <Button
              type="ghost"
              icon="file-text"
              onClick={e => this.setState({ importEmpVisible: true })}
            >
              Import EMP501
            </Button>
          </Col>
          <Col span={4}>
            <Button
              type="ghost"
              icon="file-text"
              onClick={e => this.setState({ importEasyfileVisible: true })}
            >
              Import Easyfile Export
            </Button>
          </Col>
        </Row>
        <Row justify="space-around" align="middle">
          <Col span={12}>
            <h4>
              period: <strong>{period}</strong> means from{' '}
              <strong>
                {(aPeriod[1] === '02' ? aPeriod[0] - 1 : aPeriod[0]) + '-03-01'}{' '}
              </strong>{' '}
              to{' '}
              <strong>
                {' '}
                {aPeriod[0] + (aPeriod[1] === '02' ? '-02-28' : '-08-31')}
              </strong>
            </h4>
          </Col>
        </Row>
        {this.props.cubitCompanies && this.state.submitCompany ? (
          <Emp501CreateForm
            visible={this.state.createEmpVisible}
            onSubmit={data => this.handleEmp501Create(data)}
            onCancel={e => this.setState({ createEmpVisible: false })}
            initialValues={getEmp501Create({
              ...this.state,
              taxYear:
                period.substring(5, 7) === '02'
                  ? period.substring(0, 4) - 0
                  : period.substring(0, 4) - 0 + 1,
              taxMonth: period.substring(5, 7),
              cubitCompanies: this.props.cubitCompanies
            })}
          />
        ) : (
          ''
        )}
        <Emp501Import
          visible={this.state.importEmpVisible}
          handleOk={data => this.handleEmp501Upload(data)}
          onCancel={e => this.setState({ importEmpVisible: false })}
        />
        <Emp501EfilingExport
          visible={this.state.importEasyfileVisible}
          handleOk={data => this.handleEmp501EfilingUpload(data)}
          onCancel={e => this.setState({ importEasyfileVisible: false })}
        />
      </div>
    );
  }
};

export default Emp501Create;
