import { createSelector } from 'reselect';
import { getAttendDepts } from '../attend-dept';
// import { getAttendLogs } from '../attend-log';

export const getAttendUsersRoot = state => {
  return state.attend.attendUsers;
};

export const getAttendUserList = state => {
  return getAttendUsersRoot(state).list;
};

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getAttendUserById = createSelector(getAttendUserList, (list, id) =>
  list.filter(rec => rec.id === id)
);

export const getAttendUsers = createSelector(getAttendUserList, list =>
  list.toArray()
);

export const getAttendUsersWithDept = createSelector(
  getAttendUserList,
  getAttendDepts,
  (users, depts) =>
    users
      .map(user => ({
        ...user,
        dept: depts.find(dept => dept.id === user.dept_id)
      }))
      .map(user => ({
        ...user,
        parentDept: depts.find(dept => dept.id === user.dept.parent_id)
      }))
);

// const getAccessForUser = (user, logs) =>
//   logs.filter(log => log.user_id === user.id).sort(sortLogByTime);

// export const getAttendUsersWithDeptLog = createSelector(
//   getAttendUsersWithDept,
//   getAttendLogs,
//   (users, logs) =>
//     users.map(user => ({ ...user, access: getAccessForUser(user, logs) }))
// );
