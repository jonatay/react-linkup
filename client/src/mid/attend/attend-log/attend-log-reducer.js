import { List, Record } from 'immutable';
import { attendLogActions } from './attend-log-actions';

export const AttendLogState = new Record({
  filter: { depts: ['7', '8'] },
  list: new List(),
  listParams: {}
});

export function attendLogReducer(
  state = new AttendLogState(),
  { payload, type }
) {
  switch (type) {
    case attendLogActions.CREATE_ATTEND_LOG_FULFILLED:
      return state.set('list', state.list.unshift(payload.attendLog));

    case attendLogActions.UPDATE_ATTEND_LOG_FULFILLED:
      return state.set(
        'list',
        state.list.map(r => {
          return r.id === payload.attendLog.id ? payload.attendLog : r;
        })
      );

    case attendLogActions.REMOVE_ATTEND_LOG_FULFILLED:
      return state.set(
        'list',
        state.list.filter(attendLog => {
          return attendLog.id !== payload.attendLog.id;
        })
      );

    case attendLogActions.LOAD_ATTEND_LOGS_FULFILLED:
      return state.set('list', new List(payload.attendLogs));

    case attendLogActions.FILTER_ATTEND_LOGS:
      return state.set('filter', { ...state.filter, ...payload.filter });

    default:
      return state;
  }
}
