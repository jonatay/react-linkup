/*
    Jono : 18 02 22
    FleetSettings : Stateless Functional Component
*/
import React from 'react';
//import { List } from 'immutable';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CostCentreContainer from '../cost-centre-container';

import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;

class FleetSettingsContainer extends React.Component {
  render() {
    return (
      <Tabs theme="dark" size="small">
        <TabPane
          key="cost-centres"
          tab={
            <span>
              <Icon type="tags-o" />Cost Centres
            </span>
          }
        >
          <CostCentreContainer />
        </TabPane>
      </Tabs>
    );
  }
}

FleetSettingsContainer.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FleetSettingsContainer)
);
