import { createSelector } from 'reselect';

export function getUsers(state) {
  return state.users;
}

export function getUserFilter(state) {
  return getUsers(state).filter;
}

export function getUserList(state) {
  return getUsers(state.admin).list;
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

export const getUsersList = createSelector(getUserList, userList =>
  userList.map(user => ({
    uid: user.uid,
    name: user.displayName,
    photoURL: user.photoURL
  }))
);
