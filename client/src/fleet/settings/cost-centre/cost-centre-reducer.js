import { List, Record } from 'immutable';
import { costCentreActions } from './cost-centre-actions';

export const CostCentreState = new Record({
  filter: '',
  list: new List()
});

export function costCentreReducer(
  state = new CostCentreState(),
  { payload, type }
) {
  switch (type) {
    case costCentreActions.CREATE_COST_CENTRE_FULFILLED:
      return state.set('list', state.list.unshift(payload.costCentre));

    case costCentreActions.LOAD_COST_CENTRES_FULFILLED:
      return state.set('list', new List(payload.costCentres));

    case costCentreActions.REMOVE_COST_CENTRE_FULFILLED:
      return state.set(
        'list',
        state.list.filter(costCentre => {
          return costCentre.id !== payload.costCentre.id;
        })
      );

    case costCentreActions.UPDATE_COST_CENTRE_FULFILLED:
      return state.set(
        'list',
        state.list.map(costCentre => {
          return costCentre.id === payload.costCentre.id
            ? payload.costCentre
            : costCentre;
        })
      );

    default:
      return state;
  }
}
