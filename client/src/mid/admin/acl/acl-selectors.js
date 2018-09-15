import { createSelector } from 'reselect';

export function getAcl(state) {
  return state.admin.acl.acl;
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

