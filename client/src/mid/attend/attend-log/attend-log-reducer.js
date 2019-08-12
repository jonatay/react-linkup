import { List, Record } from 'immutable';
import { attendLogActions } from './attend-log-actions';
import moment from 'moment';

export const AttendLogState = new Record({
  filter: { depts: [], excludeWeekends: true },
  list: new List(),
  listParams: { dateRange: [moment().subtract(10, 'days'), moment()] },
  blobUrl: null
});

export function attendLogReducer(
  state = new AttendLogState(),
  { payload, type }
) {
  switch (type) {
    case attendLogActions.LOAD_ATTEND_LOGS:
      return state.set('listParams', payload.listParams);
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

    case attendLogActions.LOAD_ATTEND_LOG_PDF_FULFILLED:
      return state.set('blobUrl', payload.blobUrl);
    case attendLogActions.CLEAR_ATTEND_LOG_PDF:
      URL.revokeObjectURL(payload.blobUrl);
      return state.set('blobUrl', null);

    default:
      return state;
  }
}
