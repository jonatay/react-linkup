import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from 'src/views/components/common/page-header';

import { Select, Row, Col } from 'antd';

import {
  getEmpMasters,
  getEmpDetails,
  getEmpCodes,
  empMasterActions,
  empDetailActions,
  empCodeActions
} from 'src/mid/hr';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'antd/es/button';

import EmpMasterTable from 'src/views/components/hr-sars/emp-master-table';

const Option = Select.Option;

const currY = new Date().getFullYear();

const periods = [];

for (let i = 0; i < 10; i++) {
  periods.push(currY - i + '-08');
  periods.push(currY - i + '-02');
}

const periodOptions = periods.map(p => <Option key={p}>{p}</Option>);

class Emp501Page extends React.Component {
  state = {
    coys: 'aaab',
    period: '2019-02',
    liveTest: 'Live'
  };

  componentDidMount() {
    this.props.loadEmpMasters();
    this.props.loadEmpDetails();
    this.props.loadEmpCodes();
  }

  render() {
    const { period, coys, liveTest } = this.state;
    let aPeriod = period.split('-');
    return (
      <div>
        <PageHeader>EMP501</PageHeader>
        <div>
          <Row>
            <Col span={3}>
              <Select
                placeholder="period"
                style={{ width: '100%' }}
                onChange={val => this.setState({ period: val })}
                value={period}
              >
                {periodOptions}
              </Select>
            </Col>
            <Col span={8}>
              <Select
                placeholder="company(s)"
                mode="multiple"
                style={{ width: '100%' }}
                onChange={val => this.setState({ coys: val })}
                value={coys}
              >
                <Option key="aaab">Security</Option>
                <Option key="aaac">Technical</Option>
                <Option key="aaad">Reaction</Option>
              </Select>
            </Col>
            <Col span={3}>
              <Select
                placeholder="Live/Test"
                style={{ width: '100%' }}
                value={liveTest}
              >
                <Option key="Live">Live</Option>
                <Option key="Test">Test</Option>
              </Select>
            </Col>
            <Col span={2}>
              <Button type="primary" icon="plus-square">
                Create Return
              </Button>
            </Col>
          </Row>
          <Row justify="space-around" align="middle">
            <Col span={12}>
              <h4>
                period: <strong>{period}</strong> means from{' '}
                <strong>
                  {(aPeriod[1] === '02' ? aPeriod[0] - 1 : aPeriod[0]) +
                    '-03-01'}{' '}
                </strong>{' '}
                to{' '}
                <strong>
                  {' '}
                  {aPeriod[0] + (aPeriod[1] === '02' ? '-02-28' : '-08-31')}
                </strong>
              </h4>
            </Col>
          </Row>
          <Row>
            <EmpMasterTable
              empMasters={this.props.empMasters}
              empDetails={this.props.empDetails}
            />
          </Row>
        </div>
      </div>
    );
  }
}

Emp501Page.propTypes = {
  empMasters: PropTypes.array.isRequired,
  empDetails: PropTypes.array.isRequired,
  empCodes: PropTypes.array.isRequired,
  loadEmpMasters: PropTypes.func.isRequired,
  loadEmpDetails: PropTypes.func.isRequired,
  loadEmpCodes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  empMasters: getEmpMasters(state),
  empDetails: getEmpDetails(state),
  empCodes: getEmpCodes(state)
});

const mapDispatchToProps = {
  loadEmpMasters: empMasterActions.loadEmpMasters,
  loadEmpDetails: empDetailActions.loadEmpDetails,
  loadEmpCodes: empCodeActions.loadEmpCodes
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Emp501Page)
);
