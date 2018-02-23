import { List, Record } from 'immutable';
import { vehicleActions } from './vehicle-actions';

export const VehiclesState = new Record({
  filter: '',
  showInactive: false,
  list: new List()
});

export function vehicleReducer(state = new VehiclesState(), { payload, type }) {
  switch (type) {
    case vehicleActions.CREATE_VEHICLE_FULFILLED:
      return state.set('list', state.list.unshift(payload.vehicle));

    case vehicleActions.FILTER_VEHICLES:
      return state.set('filter', payload.filter || '');

    case vehicleActions.LOAD_VEHICLES_FULFILLED:
      return state.set('list', new List(payload.vehicles));

    // case vehicleActions.REMOVE_VEHICLE_FULFILLED:
    //   return state.set(
    //     'list',
    //     state.list.filter(vehicle => {
    //       return vehicle.id !== payload.vehicle.id;
    //     })
    //   );

    case vehicleActions.UPDATE_VEHICLE_FULFILLED:
    case vehicleActions.TOGGLE_VEHICLE_IS_ACTIVE_FULFILLED:
      return state.set(
        'list',
        state.list.map(vehicle => {
          return vehicle.id === payload.vehicle.id ? payload.vehicle : vehicle;
        })
      );

    case vehicleActions.VEHICLE_TOGGLE_SHOW_INACTIVE:
      return state.set('showInactive', !state.showInactive);

    default:
      return state;
  }
}
