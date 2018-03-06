/*
    Jono : 18 02 22
    FleetSettings : Stateless Functional Component
*/
import React from 'react';
//import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

import CostCentreTable from '../../../components/fleet/cost-centre-table';
import CostCentreGroupTable from '../../../components/fleet/cost-centre-group-table';
import TransactionTypeTable from '../../../components/fleet/transaction-type-table';
import FimpImport from 'src/views/components/fleet/fims_import';

import {
  settingActions,
  getCostCentres,
  getCostCentreGroups,
  getTransactionTypes,
  getFimsPeriods
} from 'src/fleet/settings';

import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;

class FleetSettingsContainer extends React.Component {
  state = {
    activeKey: Cookies.get('fleetSettingsActiveKey') || 'cost-centre-groups'
  };

  render() {
    return (
      <Tabs
        theme="dark"
        size="small"
        activeKey={this.state.activeKey}
        onChange={activeKey => {
          Cookies.set('fleetSettingsActiveKey', activeKey, { expires: 7 });
          this.setState({ activeKey });
        }}
      >
        <TabPane
          key="cost-centre-groups"
          tab={
            <span>
              <Icon type="tags" />Cost Centre Groups
            </span>
          }
        >
          <CostCentreGroupTable {...this.props} />
        </TabPane>
        <TabPane
          key="cost-centres"
          tab={
            <span>
              <Icon type="tags-o" />Cost Centres
            </span>
          }
        >
          <CostCentreTable {...this.props} />
        </TabPane>
        <TabPane
          key="transaction-types"
          tab={
            <span>
              <Icon type="tags" />Transaction Types
            </span>
          }
        >
          <TransactionTypeTable {...this.props} />
        </TabPane>
        <TabPane
          key="fims-import"
          tab={
            <span>
              <Icon type="tags" />Fims Import
            </span>
          }
        >
          <FimpImport {...this.props} />
        </TabPane>
      </Tabs>
    );
  }
}

FleetSettingsContainer.propTypes = {
  //cost centre
  costCentres: PropTypes.instanceOf(Array).isRequired,
  loadCostCentres: PropTypes.func.isRequired,
  //cost centre group
  costCentreGroups: PropTypes.instanceOf(Array).isRequired,
  loadCostCentreGroups: PropTypes.func.isRequired,
  //transaction types
  transactionTypes: PropTypes.instanceOf(Array).isRequired,
  loadTransactionTypes: PropTypes.func.isRequired,
  //fims
  fimsPeriods: PropTypes.instanceOf(Array).isRequired,
  postFimsBatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  costCentres: getCostCentres(state),
  costCentreGroups: getCostCentreGroups(state),
  transactionTypes: getTransactionTypes(state),
  fimsPeriods: getFimsPeriods(state)
});

const mapDispatchToProps = {
  loadCostCentres: settingActions.loadCostCentres,
  loadCostCentreGroups: settingActions.loadCostCentreGroups,
  loadTransactionTypes: settingActions.loadTransactionTypes,
  loadFimsPeriods: settingActions.loadFimsPeriods,
  postFimsBatch: settingActions.postFimsBatch
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FleetSettingsContainer)
);
