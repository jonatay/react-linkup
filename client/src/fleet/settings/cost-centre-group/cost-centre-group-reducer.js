import { List, Record } from 'immutable';
import { costCentreGroupActions } from './cost-centre-group-actions';

export const CostCentreGroupState = new Record({
  filter: '',
  list: new List()
});

export function costCentreGroupReducer(
  state = new CostCentreGroupState(),
  { payload, type }
) {
  switch (type) {
    case costCentreGroupActions.CREATE_COST_CENTRE_GROUP_FULFILLED:
      return state.set(
        'costCentreGroupList',
        state.costCentreGroupList.unshift(payload.costCentreGroup)
      );

    case costCentreGroupActions.UPDATE_COST_CENTRE_GROUP_FULFILLED:
      return state.set(
        'costCentreGroupList',
        state.costCentreGroupList.map(r => {
          return r.id === payload.costCentreGroup.id
            ? payload.costCentreGroup
            : r;
        })
      );

    case costCentreGroupActions.REMOVE_COST_CENTRE_GROUP_FULFILLED:
      return state.set(
        'costCentreGroupList',
        state.costCentreGroupList.filter(costCentreGroup => {
          return costCentreGroup.id !== payload.costCentreGroup.id;
        })
      );

    case costCentreGroupActions.LOAD_COST_CENTRE_GROUPS_FULFILLED:
      return state.set(
        'costCentreGroupList',
        new List(payload.costCentreGroups)
      );

    default:
      return state;
  }
}
