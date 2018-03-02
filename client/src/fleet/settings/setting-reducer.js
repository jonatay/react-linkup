import { List, Record } from 'immutable';
import { settingActions } from './setting-actions';

export const SettingState = new Record({
  costCentreList: new List(),
  costCentreGroupList: new List(),
  transactionTypeList: new List(),
  fimsPeriodList: new List()
});

export function settingReducer(state = new SettingState(), { payload, type }) {
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

    default:
      return state;
  }
}
