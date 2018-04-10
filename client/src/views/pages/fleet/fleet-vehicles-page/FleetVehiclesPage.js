/*
    Jono : 18 02 13
    VehicleContainer : Stateless Functional Component
*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  getVehicleFilter,
  getVehcleShowInactive,
  getVisibleVehicles,
  vehicleActions,
  settingActions,
  getCostCentreGroups
} from 'src/fleet';

import FilterInput from 'src/views/components/common/filter-input/index';
import VehicleTable from 'src/views/components/fleet/vehicle-table';
import VehicleForm from 'src/views/components/fleet/vehicle-form';

import { Tabs, Icon, Switch, Row, Col } from 'antd';
import PageHeader from '../../../components/common/page-header/PageHeader';
const TabPane = Tabs.TabPane;

const IntVehicleTable = ({
  vehicles,
  vehicleFilter,
  filterVehicles,
  toggleVehicleIsActive,
  onEditVehicle,
  showInactive,
  toggleShowInactive
}) => (
  <Row>
    <Row style={{ marginBottom: 12 }}>
      <Col span={8}>
        <FilterInput filterText={vehicleFilter} onTextChange={filterVehicles} />
      </Col>
      <Col span={4}>
        <Switch
          checkedChildren="Hide Inactive"
          unCheckedChildren="Show Inactive"
          checked={showInactive}
          onChange={toggleShowInactive}
        />
      </Col>
    </Row>
    <VehicleTable
      vehicles={vehicles}
      onEditVehicle={vehicle => onEditVehicle(vehicle)}
      toggleVehicleIsActive={toggleVehicleIsActive}
    />
  </Row>
);

class FleetVehiclesPage extends React.Component {
  state = {
    editVehicles: [],
    activeKey: 'vehicles'
  };

  componentDidMount() {
    this.props.loadVehicles();
    this.props.loadCostCentreGroups();
  }

  onEditVehicle = vehicle => {
    let editVehicles = this.state.editVehicles;
    let editVeh = editVehicles.find(elem => elem.id === vehicle.id);
    if (typeof editVeh === 'undefined') {
      editVeh = editVehicles[editVehicles.push(vehicle) - 1];
    }
    this.setState({
      editVehicles,
      activeKey: String(editVehicles[editVehicles.length - 1].id)
    });
    this.forceUpdate();
  };

  onEditTabs = (targetKey, action) => {
    //should always be, just in case
    if (action === 'remove') {
      let editVehicles = this.state.editVehicles;
      let vehIdx = editVehicles.findIndex(
        elem => elem.id === Number(targetKey)
      );
      if (vehIdx >= 0) {
        editVehicles = [
          ...editVehicles.slice(0, vehIdx),
          ...editVehicles.slice(vehIdx + 1)
        ];
        this.setState({ editVehicles, activeKey: 'vehicles' });
      }
    }
  };

  onVehicleFormSubmit = (vehicle, changes) => {
    this.props.updateVehicle(vehicle, changes);
    let { editVehicles } = this.state;
    let vehIdx = editVehicles.findIndex(elem => elem.id === changes.id);
    editVehicles = [
      ...editVehicles.slice(0, vehIdx),
      changes,
      ...editVehicles.slice(vehIdx + 1)
    ];
    this.setState({ editVehicles });
  };

  render() {
    const { editVehicles, activeKey } = this.state;
    return (
      <div>
        <PageHeader>fleet-vehicles</PageHeader>
        <Tabs
          hideAdd
          theme="dark"
          type="editable-card"
          onChange={activeKey => {
            this.setState({ activeKey });
          }}
          activeKey={activeKey}
          onEdit={this.onEditTabs}
        >
          <TabPane
            key="vehicles"
            closable={false}
            tab={
              <span>
                <Icon type="table" />
              </span>
            }
          >
            <IntVehicleTable
              {...this.props}
              onEditVehicle={this.onEditVehicle}
            />
          </TabPane>
          {editVehicles.map(vehicle => (
            <TabPane
              key={vehicle.id}
              tab={
                <span>
                  <Icon type="car">{vehicle.registration}</Icon>
                </span>
              }
            >
              <VehicleForm
                form={`vehicleForm-${vehicle.id}`}
                initialValues={vehicle}
                onSubmit={data => this.onVehicleFormSubmit(vehicle, data)}
                costCentreGroups={this.props.costCentreGroups}
              />
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

FleetVehiclesPage.propTypes = {
  vehicles: PropTypes.instanceOf(Array).isRequired,
  loadVehicles: PropTypes.func.isRequired,
  filterVehicles: PropTypes.func.isRequired,
  updateVehicle: PropTypes.func.isRequired,
  toggleVehicleIsActive: PropTypes.func.isRequired,
  showInactive: PropTypes.bool.isRequired,
  toggleShowInactive: PropTypes.func.isRequired,
  costCentreGroups: PropTypes.instanceOf(Array).isRequired,
  loadCostCentreGroups: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  vehicles: getVisibleVehicles(state),
  vehicleFilter: getVehicleFilter(state),
  showInactive: getVehcleShowInactive(state),
  costCentreGroups: getCostCentreGroups(state)
});

const mapDispatchToProps = {
  loadVehicles: vehicleActions.loadVehicles,
  filterVehicles: vehicleActions.filterVehicles,
  updateVehicle: vehicleActions.updateVehicle,
  toggleVehicleIsActive: vehicleActions.toggleVehicleIsActive,
  toggleShowInactive: vehicleActions.vehicleToggleShowInactive,
  loadCostCentreGroups: settingActions.loadCostCentreGroups
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FleetVehiclesPage)
);
