import { List, Record } from 'immutable';
import { driverActions } from './driver-actions';

export const DriversState = new Record({
  filter: '',
  list: new List()
});

export function driverReducer(state = new DriversState(), {payload, type}) {
  switch (type) {
    case driverActions.CREATE_DRIVER_FULFILLED:
      return state.set('list', state.list.unshift(payload.driver));

    case driverActions.FILTER_DRIVERS:
      return state.set('filter', payload.filterType || '');

    case driverActions.LOAD_DRIVERS_FULFILLED:
      return state.set('list', new List(payload.drivers));

    case driverActions.REMOVE_DRIVER_FULFILLED:
      return state.set('list', state.list.filter(driver => {
        return driver.id !== payload.driver.id;
      }));

    case driverActions.UPDATE_DRIVER_FULFILLED:
      return state.set('list', state.list.map(driver => {
        return driver.id === payload.driver.id ? payload.driver : driver;
      }));

    default:
      return state;
  }
}
