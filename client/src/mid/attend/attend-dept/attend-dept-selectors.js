import { createSelector } from 'reselect';
import _ from 'lodash';

export const getAttendDeptsRoot = state => {
  return state.attend.attendDepts;
};

export const getAttendDeptList = state => {
  return getAttendDeptsRoot(state).list;
};

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getAttendDeptById = createSelector(getAttendDeptList, (list, id) =>
  list.filter(rec => rec.id === id)
);

export const getAttendDepts = createSelector(getAttendDeptList, list =>
  list.toArray()
);

const unflatten = (array, parent, tree) => {
  tree = typeof tree !== 'undefined' ? tree : [];
  parent = typeof parent !== 'undefined' ? parent : { key: 0 };
  var children = _.filter(array, function(child) {
    return child.parent_id === parent.key;
  });
  if (!_.isEmpty(children)) {
    if (parent.key === 0) {
      tree = children;
    } else {
      parent['children'] = children;
    }
    _.each(children, function(child) {
      unflatten(array, child);
    });
  }
  return tree;
};

export const getAttendDeptsTree = createSelector(getAttendDepts, depts =>
  unflatten(
    depts.map(dept => ({
      title: dept.name,
      value: dept.id.toString(),
      key: dept.id,
      parent_id: dept.parent_id
    }))
  )
);
