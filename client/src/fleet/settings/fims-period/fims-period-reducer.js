import { List, Record } from 'immutable';
import { fimsPeriodActions } from './fims-period-actions';

export const FimsPeriodState = new Record({
  filter: '',
  list: new List(),
  isAvailable: true
});

export function fimsPeriodReducer(
  state = new FimsPeriodState(),
  { payload, type }
) {
  switch (type) {
    case fimsPeriodActions.LOAD_FIRMS_PERIODS_FULFILLED:
      return state.set('list', new List(payload.fimsPeriods));

    case fimsPeriodActions.IMPORT_FIRMS_PERIOD:
    case fimsPeriodActions.POST_FIMS_BATCH:
      return state.set('isAvailable', false);

    case fimsPeriodActions.POST_FIMS_BATCH_FULFILLED:
    case fimsPeriodActions.IMPORT_FIRMS_PERIOD_FULFILLED:
      return state.set('isAvailable', true).set(
        'list',
        state.list.find(rec => rec.id === payload.fimsPeriod.id)
          ? state.list.map(fimsPeriod => {
              return fimsPeriod.id === payload.fimsPeriod.id
                ? payload.fimsPeriod
                : fimsPeriod;
            })
          : state.list.push(payload.fimsPeriod)
      );

    case fimsPeriodActions.POST_FIMS_BATCH_FAILED:
    case fimsPeriodActions.IMPORT_FIRMS_PERIOD_FAILED:
      return state.set('isAvailable', true);

    case fimsPeriodActions.REMOVE_FIRMS_PERIOD_FULFILLED:
      return state.set('list', state.list.filter(fp => fp.id !== payload.id));

    default:
      return state;
  }
}
