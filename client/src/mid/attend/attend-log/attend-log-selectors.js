import { createSelector } from 'reselect';
import { getAttendUsers, getAttendUsersWithDept } from '../attend-user';
import { getAttendDepts } from '../attend-dept';
import _ from 'lodash';
import moment from 'moment';

export const getAttendLogsRoot = state => {
  return state.attend.attendLogs;
};

export const getAttendLogList = state => {
  return getAttendLogsRoot(state).list;
};

export const getAttendLogFilter = state => {
  return getAttendLogsRoot(state).filter;
};

export function getAttendLogListParams(state) {
  return getAttendLogsRoot(state).listParams;
}

export function getBlobUrl(state) {
  return getAttendLogsRoot(state).blobUrl;
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getAttendLogById = createSelector(getAttendLogList, (list, id) =>
  list.filter(rec => rec.id === id)
);

export const getAttendLogs = createSelector(getAttendLogList, list =>
  list.toArray()
);

export const getAttendLogWithUserDept = createSelector(
  getAttendLogs,
  getAttendUsersWithDept,
  (logs, users) =>
    logs.map(log => ({
      ...log,
      user: users.find(user => user.id === log.user_id)
    }))
);

export const getAttendLogFiltered = createSelector(
  getAttendLogList,
  getAttendLogFilter,
  (attendLogList, filter) => attendLogList.filter(logItem => true)
);

const unflatten = (array, parent, tree) => {
  tree = typeof tree !== 'undefined' ? tree : [];
  parent = typeof parent !== 'undefined' ? parent : { id: 0 };
  var children = _.filter(array, function(child) {
    return child.parent_id === parent.id;
  });
  if (!_.isEmpty(children)) {
    if (parent.id === 0) {
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

export const getAttendLogsVis = createSelector(
  getAttendLogFiltered,
  getAttendUsers,
  getAttendDepts,
  (logs, users, depts) =>
    unflatten(
      depts.map(dept => ({
        ...dept,
        users: users.filter(user => user.dept_id === dept.id).map(user => ({
          ...user,
          attend: logs.filter(log => log.user_id === user.id)
        }))
      }))
    )
);

const sortLogByTime = (a, b) => (a > b ? 1 : a < b ? -1 : 0);

const getAttendForUser = (user, logs) =>
  logs
    .filter(log => log.user_id === user.id)
    .sort(sortLogByTime)
    .reduce((ret, log) => {
      //let item = findLogByDay(ret, log);
      let idx = ret.findIndex(
        e => e.log_time.slice(0, 10) === log.log_time.slice(0, 10)
      );
      if (idx === -1) {
        return [...ret, { log_time: log.log_time, entry_time: log.log_time }];
      } else {
        return [
          ...ret.slice(0, idx),
          { ...ret[idx], exit_time: log.log_time },
          ...ret.slice(idx + 1)
        ];
      }
    }, [])
    .reverse();

export const getAttendUsersWithDeptLog = createSelector(
  getAttendUsersWithDept,
  getAttendLogs,
  (users, logs) =>
    users
      .toArray()
      .map(user => ({ ...user, attend: getAttendForUser(user, logs) }))
      .filter(user => user.attend.length > 0)
);

export const getAttendLogsPeriods = createSelector(
  getAttendLogList,
  getAttendLogFilter,
  (logs, filter) =>
    logs
      .toArray()
      .map(log => log.log_time.slice(0, 10))
      .sort(sortLogByTime)
      .reverse()
      .reduce((r, p) => (r[r.length - 1] === p ? r : [...r, p]), [])
      .filter(
        log =>
          filter.excludeWeekends
            ? moment(log).day() > 0 && moment(log).day() < 6
            : true
      )
);

const isUserInDepts = (user, depts) =>
  depts.reduce(
    (ret, dept) =>
      ret ||
      ((user.dept && user.dept.id.toString() === dept) ||
        (user.parentDept && user.parentDept.id.toString() === dept)),
    false
  );

export const getAttendLogTableData = createSelector(
  getAttendUsersWithDept,
  getAttendLogs,
  getAttendLogsPeriods,
  getAttendLogFilter,
  (users, logs, periods, filter) =>
    users
      .filter(
        user =>
          filter.depts && filter.depts.length > 0
            ? isUserInDepts(user, filter.depts)
            : false
      )
      .map(user => ({
        ...user,
        logCount: logs.filter(log => log.user_id === user.id).length,
        //attend: getAttendForUser(user, logs),
        ...periods.reduce(
          (r, p) => ({
            ...r,
            [p]: logs.filter(
              log => log.user_id === user.id && log.log_time.slice(0, 10) === p
            )
          }),
          {}
        )
      }))
      .filter(user => user.logCount > 0)
      .toArray()
);
