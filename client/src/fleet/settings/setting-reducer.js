import { List, Record } from 'immutable';
import { settingActions } from './setting-actions';

export const SettingState = new Record({
  costCentreList: new List(),
  costCentreGroupList: new List(),
  transactionTypeList: new List(),
  fimsPeriodList: new List()
});

export function settingReducer(state = new SettingState(), { payload, type }) {
  const { fimsPeriodList } = state;
  switch (type) {
    case settingActions.CREATE_COST_CENTRE_FULFILLED:
      return state.set(
        'costCentreList',
        state.list.unshift(payload.costCentre)
      );

    case settingActions.LOAD_COST_CENTRES_FULFILLED:
      return state.set('costCentreList', new List(payload.costCentres));

    case settingActions.REMOVE_COST_CENTRE_FULFILLED:
      return state.set(
        'costCentreList',
        state.list.filter(costCentre => {
          return costCentre.id !== payload.costCentre.id;
        })
      );
    case settingActions.UPDATE_COST_CENTRE_FULFILLED:
      return state.set(
        'list',
        state.list.map(costCentre => {
          return costCentre.id === payload.costCentre.id
            ? payload.costCentre
            : costCentre;
        })
      );

    case settingActions.LOAD_COST_CENTRE_GROUPS_FULFILLED:
      return state.set(
        'costCentreGroupList',
        new List(payload.costCentreGroups)
      );

    case settingActions.LOAD_TRANSACTION_TYPES_FULFILLED:
      return state.set(
        'transactionTypeList',
        new List(payload.transactionTypes)
      );

    case settingActions.LOAD_FIRMS_PERIODS_FULFILLED:
      return state.set('fimsPeriodList', new List(payload.fimsPeriods));

    case settingActions.POST_FIMS_BATCH_FULFILLED:
    case settingActions.IMPORT_FIRMS_PERIOD_FULFILLED:
      return state.set(
        'fimsPeriodList',
        fimsPeriodList.find(rec => rec.id === payload.fimsPeriod.id)
          ? fimsPeriodList.map(fimsPeriod => {
              return fimsPeriod.id === payload.fimsPeriod.id
                ? payload.fimsPeriod
                : fimsPeriod;
            })
          : fimsPeriodList.push(payload.fimsPeriod)
      );

    case settingActions.REMOVE_FIRMS_PERIOD_FULFILLED:
      return state.set(
        'fimsPeriodList',
        fimsPeriodList.filter(fp => fp.id !== payload.id)
      );

    default:
      return state;
  }
}
