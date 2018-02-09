import { createSelector } from 'reselect';

export function getVehicles(state) {
  return state.vehicles;
}

export function getVehicleFilter(state) {
  return getVehicles(state).filter;
}

export function getVehicleList(state) {
  return getVehicles(state.fleet).list;
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleVehicles = createSelector(
  getVehicleList,
  vehicleList => vehicleList
);

export const getVehicleById = createSelector(
  getVehicleList,
  (vehicleList, uid) => vehicleList.filter(vehicle => vehicle.uid === uid)
);

export const getVehiclesList = createSelector(
  getVehicleList,
  vehicleList => vehicleList
);
