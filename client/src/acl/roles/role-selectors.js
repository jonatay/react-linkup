import { createSelector } from 'reselect';


export function getRoles(state) {
  return state.roles;
}

export function getRoleFilter(state) {
  return getRoles(state).filter;
}

export function getRoleList(state) {
  return getRoles(state).list;
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleRoles = createSelector(
  // getRoleFilter,
  getRoleList,
  (roleList) => (roleList)
  // (filter, roleList) => {
  //   switch (filter) {
  //     case 'active':
  //       return roleList.filter(role => !role.completed);
  //
  //     case 'completed':
  //       return roleList.filter(role => role.completed);
  //
  //     default:
  //       return roleList;
  //   }
  // }
);
