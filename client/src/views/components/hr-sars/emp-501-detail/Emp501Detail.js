import React from 'react';
/*
    Jono : 19 02 27
    Emp501Detail : Stateless Functional Component
*/

import { Row, Col, Statistic, Tag, Collapse } from 'antd';
// import { Field } from 'redux-form';
const { Panel } = Collapse;

const PanelHeader = props => (
  <span style={{ width: '100%' }}>
    <h4
      style={{
        color: 'blue',
        backgroundColor: 'lightblue',
        paddingLeft: 20
      }}
    >
      {props.children}
    </h4>
  </span>
);

const EmpDisplay = ({ description, value, heading }) => (
  <div style={{ paddingLeft: 2 }}>
    <Statistic
      title={heading}
      value={value ? value : '**NO VALUE**'}
      formatter={value => value}
      valueStyle={{
        marginTop: 0,
        fontSize: 16,
        border: '1px solid lightblue',
        borderPadius: 2,
        paddingLeft: 4,
        color: value ? 'blue' : 'red',
        fontFamily: 'monospace',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      }}
    />
    <Tag color="blue" style={{ marginTop: 2 }}>
      {description}
    </Tag>
  </div>
);

const EmpDetailRows = ({ empDetails }) => (
  <div>
    {empDetails.map(empDetail => (
      <Collapse key={empDetail.id} defaultActiveKey={['certInfo', 'incDed']}>
        <Panel
          key="certInfo"
          header={<PanelHeader>Certificate Information</PanelHeader>}
        >
          <Row>
            <Col span={7}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3010']}
                heading="3010"
                description="Certificate Number"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3015']}
                heading="3015"
                description="Certificate Type"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3020']}
                heading="3020"
                description="Person Nature"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3025']}
                heading="3025"
                description="Assessment Year"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3026']}
                heading="3026"
                description="ETI Indicator"
              />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3030']}
                heading="3030"
                description="Emp Surname"
              />
            </Col>
            <Col span={5}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3040']}
                heading="3040"
                description="Emp First Names"
              />
            </Col>
            <Col span={2}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3050']}
                heading="3050"
                description="Initials"
              />
            </Col>
            <Col span={4}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3060']}
                heading="3060"
                description="ID Number"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3080']}
                heading="3080"
                description="Date Of Birth"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3100']}
                heading="3100"
                description="Income Tax Ref."
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3263']}
                heading="3263"
                description="SIC7 Code"
              />
            </Col>
          </Row>
        </Panel>
        <Panel
          key="certContact"
          header={<PanelHeader>Certificate Contact & Sundry</PanelHeader>}
        >
          <Row>
            <Col span={3}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3136']}
                heading="3136"
                description="Empl Tel Nbr"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3138']}
                heading="3138"
                description="Cell Nbr"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3146']}
                heading="3146"
                description="EA St Nbr"
              />
            </Col>{' '}
            <Col span={3}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3147']}
                heading="3147"
                description="EA Street"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3149']}
                heading="3149"
                description="EA Town"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3150']}
                heading="3150"
                description="EA PCode"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3151']}
                heading="3151"
                description="EA CCode"
              />
            </Col>
          </Row>
          <Row>
            <Col span={2}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3160']}
                heading="3160"
                description="Emp number"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3170']}
                heading="3170"
                description="Cert Start"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3180']}
                heading="3180"
                description="Cert End"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3190']}
                heading="3190"
                description="ETI Start"
              />
            </Col>
            <Col span={2}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3200']}
                heading="3200"
                description="Mths Tot"
              />
            </Col>
            <Col span={2}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3210']}
                heading="3210"
                description="Mths Worked"
              />
            </Col>
          </Row>
          {/*emp Addr*/}
          <Row>
            <Col span={2}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3213']}
                heading="3213"
                description="Emp St Nbr"
              />
            </Col>{' '}
            <Col span={2}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3214']}
                heading="3214"
                description="Emp Street"
              />
            </Col>
            <Col span={2}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3216']}
                heading="3216"
                description="Emp Town"
              />
            </Col>
            <Col span={2}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3217']}
                heading="3217"
                description="Emp PCode"
              />
            </Col>
            <Col span={2}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3285']}
                heading="3285"
                description="Emp CCode"
              />
            </Col>
            <Col span={1}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3279']}
                heading="3279"
                description="co"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3283']}
                heading="3283"
                description="co Intemediary"
              />
            </Col>
            <Col span={1}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3288']}
                heading="3288"
                description="PO S"
              />
            </Col>
            <Col span={2}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3249']}
                heading="3249"
                description="PO ?"
              />
            </Col>
            <Col span={2}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3262']}
                heading="3262"
                description="PO N"
              />
            </Col>
            <Col span={2}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3253']}
                heading="3253"
                description="PO T"
              />
            </Col>
            <Col span={2}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3254']}
                heading="3254"
                description="PO C"
              />
            </Col>
            <Col span={1}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3286']}
                heading="3286"
                description="PO C"
              />
            </Col>
          </Row>
          <Row>
            <Col span={1}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3240']}
                heading="3240"
                description="BAccT"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3241']}
                heading="3241"
                description="BAcc Nbr"
              />
            </Col>
            <Col span={2}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3242']}
                heading="3242"
                description="Br Nbr"
              />
            </Col>
            <Col span={4}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3245']}
                heading="3245"
                description="BAcc Holder"
              />
            </Col>
            <Col span={1}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3246']}
                heading="3246"
                description="HoRel"
              />
            </Col>
          </Row>
        </Panel>
        <Panel
          key="incDed"
          header={<PanelHeader>Income / Deductions</PanelHeader>}
        >
          <Row>
            <Col span={4}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3696']}
                heading="3696"
                description="No-Tax Inc"
              />
            </Col>
            <Col span={4}>
              <EmpDisplay
                value={empDetail.empEmployeeData['3697']}
                heading="3697"
                description="Tax Inc"
              />
            </Col>
            <Col span={4}>
              <EmpDisplay
                value={empDetail.empEmployeeData['4102']}
                heading="4102"
                description="Ded PAYE"
              />
            </Col>
            <Col span={4}>
              <EmpDisplay
                value={empDetail.empEmployeeData['4141']}
                heading="4141"
                description="Ded UIF"
              />
            </Col>
            <Col span={4}>
              <EmpDisplay
                value={empDetail.empEmployeeData['4142']}
                heading="4142"
                description="Ded SDL"
              />
            </Col>
          </Row>
        </Panel>
      </Collapse>
    ))}
  </div>
);

const Emp501Detail = ({ empMaster }) => {
  return (
    <div>
      <Collapse
        // accordion
        bordered={false}
        defaultActiveKey={['detailRows']}
      >
        <Panel header={<PanelHeader>Header</PanelHeader>} key="header">
          <Row>
            <Col span={5}>
              <EmpDisplay
                value={empMaster.empHeader['2010']}
                heading="2010"
                description="Trading or Other Name"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empMaster.empHeader['2015']}
                heading="2015"
                description="TEST / LIVE"
              />
            </Col>
            <Col span={4}>
              <EmpDisplay
                value={empMaster.empHeader['2020']}
                heading="2020"
                description="PAYE Reference"
              />
            </Col>
            <Col span={4}>
              <EmpDisplay
                value={empMaster.empHeader['2022']}
                heading="2022"
                description="SDL Reference"
              />
            </Col>
            <Col span={4}>
              <EmpDisplay
                value={empMaster.empHeader['2024']}
                heading="2024"
                description="UIF Reference"
              />
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <EmpDisplay
                value={empMaster.empHeader['2025']}
                heading="2025"
                description="ECP: First Name"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empMaster.empHeader['2036']}
                heading="2036"
                description="ECP: Surname"
              />
            </Col>{' '}
            <Col span={3}>
              <EmpDisplay
                value={empMaster.empHeader['2038']}
                heading="2038"
                description="ECP: Position"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empMaster.empHeader['2040']}
                heading="2040"
                description="ECP: Cell No."
              />
            </Col>
            <Col span={5}>
              <EmpDisplay
                value={empMaster.empHeader['2027']}
                heading="2027"
                description="ECP: E-mail address"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empMaster.empHeader['2028']}
                heading="2028"
                description="Payroll SW Prov."
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empMaster.empHeader['2029']}
                heading="2029"
                description="Payroll SW Pkg."
              />
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <EmpDisplay
                value={empMaster.empHeader['2030']}
                heading="2030"
                description="Tran Yr"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empMaster.empHeader['2031']}
                heading="2031"
                description="Recon Per."
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empMaster.empHeader['2082']}
                heading="2082"
                description="Emp SIC7"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empMaster.empHeader['2035']}
                heading="2035"
                description="Emp TradeC"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empMaster.empHeader['2037']}
                heading="2037"
                description="Dipl. Immune."
              />
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <EmpDisplay
                value={empMaster.empHeader['2063']}
                heading="2063"
                description="EA St Nbr"
              />
            </Col>{' '}
            <Col span={3}>
              <EmpDisplay
                value={empMaster.empHeader['2064']}
                heading="2064"
                description="EA Street"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empMaster.empHeader['2066']}
                heading="2066"
                description="EA Town"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empMaster.empHeader['2080']}
                heading="2080"
                description="EA PCode"
              />
            </Col>
            <Col span={3}>
              <EmpDisplay
                value={empMaster.empHeader['2081']}
                heading="2081"
                description="EA CCode"
              />
            </Col>
          </Row>
        </Panel>
        <Panel header={<PanelHeader>Detail Rows</PanelHeader>} key="detailRows">
          <EmpDetailRows empDetails={empMaster.empDetails} />
        </Panel>
        <Panel header={<PanelHeader>Footer</PanelHeader>} key="footer">
          <Row>
            <Col span={3}>
              <EmpDisplay
                value={empMaster.empTrailer['6010']}
                heading="6010"
                description="Emp Total Recs"
              />
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Emp501Detail;
