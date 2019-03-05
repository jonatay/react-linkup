import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PageHeader from 'src/views/components/common/page-header';

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
// import Emp501DetailForm from 'src/views/components/hr-sars/emp-501-detail-form';
import EMP501Detail from 'src/views/components/hr-sars/emp-501-detail';

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

import { Icon, Row, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class Emp501Page extends React.Component {
  state = {
    sortedInfo: {
      order: 'descend',
      columnKey: 'period'
    },
    editEmpMasters: [],
    activeKey: 'empMasters'
  };

  componentDidMount() {
    this.props.loadEmpMasters();
    this.props.loadEmpDetails();
    this.props.loadEmpCodes();
    this.props.loadCodeLkps();
    this.props.loadCubitCompanies();
  }

  editEmp501(empMasterId) {
    let { editEmpMasters } = this.state;
    let editEmpMaster = editEmpMasters.find(em => em.id === empMasterId);
    if (typeof editEmpMaster === 'undefined') {
      editEmpMaster = this.props.empMasters.find(ed => ed.id === empMasterId);
      editEmpMasters = [...editEmpMasters, editEmpMaster];
    }

    this.setState({
      editEmpMasters: editEmpMasters,
      activeKey: `empMasterId-${empMasterId}`
    });
    this.forceUpdate();
  }

  onEdit(targetKey, action) {
    // console.log(targetKey, action);
    // if (action === 'remove') {
    let { editEmpMasters } = this.state;
    let emIdx = editEmpMasters.findIndex(
      elem => elem.id === Number(targetKey.split('-')[1])
    );
    if (emIdx >= 0) {
      editEmpMasters = [
        ...editEmpMasters.slice(0, emIdx),
        ...editEmpMasters.slice(emIdx + 1)
      ];
      this.setState({ editEmpMasters, activeKey: 'empMasters' });
    }
  }

  handleEmp501DetailSubmit(data) {
    console.log(data);
  }

  render() {
    const { editEmpMasters, activeKey } = this.state;
    return (
      <div>
        <PageHeader>
          EMP501/
          {activeKey}
        </PageHeader>
        <Tabs
          hideAdd
          theme="dark"
          type="editable-card"
          onChange={activeKey => {
            this.setState({ activeKey });
          }}
          onEdit={(targetKey, action) => this.onEdit(targetKey, action)}
          activeKey={activeKey}
          //onEdit={this.onEditTabs}
        >
          <TabPane
            key="empMasters"
            expanded
            closable={false}
            tab={
              <span>
                <Icon type="table" />
              </span>
            }
          >
            <div>
              <Emp501Create {...this.props} />
              <Row>
                <EmpMasterTable
                  {...this.props}
                  removeEmpMaster={empMaster => {
                    this.props.removeEmpMaster(empMaster);
                    this.setState({
                      editEmpMasters: this.state.editEmpMasters.filter(
                        em => em.id !== empMaster.id
                      )
                    });
                  }}
                  editEmp501={empMasterId => this.editEmp501(empMasterId)}
                />
              </Row>
            </div>
          </TabPane>
          {editEmpMasters.map(empMaster => (
            <TabPane
              key={`empMasterId-${empMaster.id}`}
              tab={
                <span>
                  <Icon type="audit">{empMaster.period}</Icon>
                </span>
              }
            >
              <EMP501Detail
                empMaster={{
                  ...empMaster,
                  empHeader: empMaster.emp_header
                    ? JSON.parse(empMaster.emp_header)
                    : null,
                  empTrailer: empMaster.emp_trailer
                    ? JSON.parse(empMaster.emp_trailer)
                    : null,
                  empDetails: this.props.empDetails
                    .filter(eD => eD.emp_master_id === empMaster.id)
                    .sort(
                      (a, b) =>
                        a.employee_code > b.employee_code
                          ? 1
                          : a.employee_code < b.employee_code
                            ? -1
                            : 0
                    )
                    .map(eD => ({
                      ...eD,
                      empEmployeeData: eD.emp_employee_data
                        ? JSON.parse(eD.emp_employee_data)
                        : null
                    }))
                }}
              />
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

/*
<Emp501DetailForm
              onSubmit={data => this.handleEmp501Create(data)}
              onCancel={e => this.setState({ createEmpVisible: false })}
              initialValues={{
              ...empMaster,
              empHeader: empMaster.emp_header
              ? JSON.parse(empMaster.emp_header)
              : null,
              empTrailer: empMaster.emp_trailer
              ? JSON.parse(empMaster.emp_trailer)
              : null,
              empDetails: this.props.empDetails
              .filter(eD => eD.emp_master_id === empMaster.id)
              .sort(
              (a, b) =>
              a.employee_code > b.employee_code
              ? 1
              : a.employee_code < b.employee_code
              ? -1
              : 0
              )
              .map(eD => ({
              ...eD,
              empEmployeeData: eD.emp_employee_data
              ? JSON.parse(eD.emp_employee_data)
              : null
              }))
              }}
              />
 */

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
