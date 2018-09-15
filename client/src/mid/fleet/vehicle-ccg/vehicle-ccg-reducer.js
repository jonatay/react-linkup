import { List, Record } from 'immutable';
import { vehicleCcgActions } from './vehicle-ccg-actions';

export const VehicleCcgsState = new Record({
  filter: '',
  list: new List()
});

export function vehicleCcgReducer(
  state = new VehicleCcgsState(),
  { payload, type }
) {
  switch (type) {
    case vehicleCcgActions.CREATE_VEHICLE_CCG_FULFILLED:
      return state.set('list', state.list.unshift(payload.vehicleCcg));

    case vehicleCcgActions.FILTER_VEHICLE_CCGS:
      return state.set('filter', payload.filterType || '');

    case vehicleCcgActions.LOAD_VEHICLE_CCGS_FULFILLED:
      return state.set('list', new List(payload.vehicleCcgs));

    case vehicleCcgActions.REMOVE_VEHICLE_CCG_FULFILLED:
      return state.set(
        'list',
        state.list.filter(vehicleCcg => {
          return vehicleCcg.id !== payload.id;
        })
      );

    case vehicleCcgActions.UPDATE_VEHICLE_CCG_FULFILLED:
      return state.set(
        'list',
        state.list.map(vehicleCcg => {
          return vehicleCcg.id === payload.vehicleCcg.id
            ? payload.vehicleCcg
            : vehicleCcg;
        })
      );

    default:
      return state;
  }
}
