import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { rightActions, getVisibleRights } from 'src/admin';

import RightForm  from 'src/components/admin/RightForm';

import RightTable from 'src/components/admin/RightTable';

const RightsPage = ({ createRight, removeRight, rights, updateRight }) => {
  return (
    <div>
      <RightForm handleSubmit={createRight}/>
      <RightTable
        createRight={createRight}
        removeRight={removeRight}
        rights={rights}
        updateRight={updateRight}
      />
    </div>
  );
};

RightsPage.propTypes = {
  createRight: PropTypes.func.isRequired,
  filterRights: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  removeRight: PropTypes.func.isRequired,
  rights: PropTypes.instanceOf(List),
  updateRight: PropTypes.func.isRequired
};

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = state => ({
  rights: getVisibleRights(state)
});

const mapDispatchToProps = {
  createRight: rightActions.createRight,
  filterRights: rightActions.filterRights,
  removeRight: rightActions.removeRight,
  updateRight: rightActions.updateRight
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RightsPage)
);
