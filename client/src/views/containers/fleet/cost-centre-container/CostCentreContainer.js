/*
    Jono : 18 02 23
    CostCentreContainer : Stateless Functional Component
*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CostCentreTable from '../../../components/fleet/cost-centre-table';
import {
  settingActions,
  getCostCentres,
  getCostCentreGroups
} from 'src/fleet/settings';

class CostCentreContainer extends React.Component {
  componentDidMount() {
    this.props.loadCostCentres();
    this.props.loadCostCentreGroups();
  }

  render() {
    return (
      <div>
        <CostCentreTable {...this.props} />
      </div>
    );
  }
}

CostCentreContainer.propTypes = {
  costCentres: PropTypes.instanceOf(Array).isRequired,
  loadCostCentres: PropTypes.func.isRequired,
  costCentreGroups: PropTypes.instanceOf(Array).isRequired,
  loadCostCentreGroups: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  costCentres: getCostCentres(state),
  costCentreGroups: getCostCentreGroups(state)
});

const mapDispatchToProps = {
  loadCostCentres: settingActions.loadCostCentres,
  loadCostCentreGroups: settingActions.loadCostCentreGroups
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CostCentreContainer)
);
