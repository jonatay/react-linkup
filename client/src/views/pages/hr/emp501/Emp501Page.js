import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PageHeader from 'src/views/components/common/page-header';

import { Row } from 'antd';

import {
  getEmpMasters,
  getEmpDetails,
  getEmpCodes,
  getCodeLkps,
  empMasterActions,
  empDetailActions,
  empCodeActions,
  codeLkpActions,
  getCubitCompanies
} from 'src/mid/hr';

import EmpMasterTable from 'src/views/components/hr-sars/emp-master-table';
import Emp501Create from 'src/views/components/hr-sars/emp-501-create';

//handle apiErrors
// const openNotification = apiError => {
//   notification['error']({
//     message: apiError.code,
//     description: JSON.stringify(apiError),
//     duration: 0,
//     style: {
//       width: 600,
//       marginLeft: 335 - 600
//     }
//   });
// };

class Emp501Page extends React.Component {
  state = {
    sortedInfo: {
      order: 'descend',
      columnKey: 'period'
    }
  };

  componentDidMount() {
    this.props.loadEmpMasters();
    this.props.loadEmpDetails();
    this.props.loadEmpCodes();
    this.props.loadCodeLkps();
    this.props.loadCubitCompanies();
  }

  render() {
    return (
      <div>
        <PageHeader>EMP501</PageHeader>
        <div>
          <Emp501Create {...this.props} />
          <Row>
            <EmpMasterTable {...this.props} />
          </Row>
        </div>
      </div>
    );
  }
}

Emp501Page.propTypes = {
  //data
  empMasters: PropTypes.array.isRequired,
  empDetails: PropTypes.array.isRequired,
  empCodes: PropTypes.array.isRequired,
  codeLkps: PropTypes.array.isRequired,
  cubitCompanies: PropTypes.array.isRequired,
  //actions
  loadEmpMasters: PropTypes.func.isRequired,
  loadEmpDetails: PropTypes.func.isRequired,
  loadEmpCodes: PropTypes.func.isRequired,
  loadCodeLkps: PropTypes.func.isRequired,
  importEmpMaster: PropTypes.func.isRequired,
  removeEmpMaster: PropTypes.func.isRequired,
  createEmpMaster: PropTypes.func.isRequired,
  loadCubitCompanies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  empMasters: getEmpMasters(state),
  empDetails: getEmpDetails(state),
  empCodes: getEmpCodes(state),
  codeLkps: getCodeLkps(state),
  cubitCompanies: getCubitCompanies(state)
});

const mapDispatchToProps = {
  loadEmpMasters: empMasterActions.loadEmpMasters,
  loadEmpDetails: empDetailActions.loadEmpDetails,
  loadEmpCodes: empCodeActions.loadEmpCodes,
  loadCodeLkps: codeLkpActions.loadCodeLkps,
  importEmpMaster: empMasterActions.importEmpMaster,
  removeEmpMaster: empMasterActions.removeEmpMaster,
  createEmpMaster: empMasterActions.createEmpMaster,
  loadCubitCompanies: empMasterActions.loadCubitCompanies
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Emp501Page)
);
