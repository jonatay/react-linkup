import { createSelector } from 'reselect';

export function getUsers(state) {
  return state.users;
}

export function getUserFilter(state) {
  return getUsers(state).filter;
}

export function getUserList(state) {
  return getUsers(state).list;
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleUsers = createSelector(
  getUserList,
  userList => userList
);

export const getUserById = createSelector(getUserList, (userList, uid) =>
  userList.filter(user => user.uid === uid)
);
