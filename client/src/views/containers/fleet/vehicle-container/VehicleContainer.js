/*
    Jono : 18 02 13
    VehicleContainer : Stateless Functional Component
*/
import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  getVehicleFilter,
  getVisibleVehicles,
  vehicleActions
} from 'src/fleet';

import FilterInput from 'src/views/components/common/filter-input/index';
import VehicleTable from 'src/views/components/fleet/vehicle-table';
import VehicleForm from 'src/views/components/fleet/vehicle-form';

import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;

const IntVehicleTable = ({
  vehicles,
  vehicleFilter,
  filterVehicles,
  onEditVehicle
}) => (
  <div>
    <FilterInput filterText={vehicleFilter} onTextChange={filterVehicles} />
    <VehicleTable
      vehicles={vehicles}
      onEditVehicle={vehicle => onEditVehicle(vehicle)}
    />
  </div>
);

class VehicleContainer extends React.Component {
  state = {
    editVehicles: [],
    activeKey: 'vehicles'
  };
  componentDidMount() {
    this.props.loadVehicles();
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
          <IntVehicleTable {...this.props} onEditVehicle={this.onEditVehicle} />
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
              initialValues={vehicle}
              onSubmit={data => this.onVehicleFormSubmit(vehicle, data)}
            />
          </TabPane>
        ))}
      </Tabs>
    );
  }
}

VehicleContainer.propTypes = {
  vehicles: PropTypes.instanceOf(List).isRequired,
  loadVehicles: PropTypes.func.isRequired,
  filterVehicles: PropTypes.func.isRequired,
  updateVehicle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  vehicles: getVisibleVehicles(state),
  vehicleFilter: getVehicleFilter(state)
});

const mapDispatchToProps = {
  loadVehicles: vehicleActions.loadVehicles,
  filterVehicles: vehicleActions.filterVehicles,
  updateVehicle: vehicleActions.updateVehicle
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VehicleContainer)
);
