import { List, Record } from 'immutable';
import { fimsPeriodActions } from './fims-period-actions';

export const FimsPeriodState = new Record({
  filter: '',
  list: new List()
});

export function fimsPeriodReducer(
  state = new FimsPeriodState(),
  { payload, type }
) {
  const { fimsPeriodList } = state.list;
  switch (type) {
    case fimsPeriodActions.LOAD_FIRMS_PERIODS_FULFILLED:
      return state.set('fimsPeriodList', new List(payload.fimsPeriods));

    case fimsPeriodActions.POST_FIMS_BATCH_FULFILLED:
    case fimsPeriodActions.IMPORT_FIRMS_PERIOD_FULFILLED:
      return state.set(
        'list',
        fimsPeriodList.find(rec => rec.id === payload.fimsPeriod.id)
          ? fimsPeriodList.map(fimsPeriod => {
            return fimsPeriod.id === payload.fimsPeriod.id
              ? payload.fimsPeriod
              : fimsPeriod;
          })
          : fimsPeriodList.push(payload.fimsPeriod)
      );

    case fimsPeriodActions.REMOVE_FIRMS_PERIOD_FULFILLED:
      return state.set(
        'list',
        fimsPeriodList.filter(fp => fp.id !== payload.id)
      );

    default:
      return state;
  }
}
