import { createSelector } from 'reselect';

export function getVehicles(state) {
  return state.fleet.vehicles;
}

export function getVehicleFilter(state) {
  return getVehicles(state).filter;
}

export function getVehicleList(state) {
  return getVehicles(state).list;
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleVehicles = createSelector(
  getVehicleList,
  getVehicleFilter,
  (vehicleList, filter) =>
    vehicleList.filter(
      vehicle =>
        vehicle.name.toLowerCase().includes(filter.toLowerCase()) ||
        vehicle.registration.toLowerCase().includes(filter.toLowerCase()) ||
        vehicle.fims_drivers
          .join(' ')
          .toLowerCase()
          .includes(filter.toLowerCase())
    )
);

export const getVehicleById = createSelector(
  getVehicleList,
  (vehicleList, id) => vehicleList.filter(vehicle => vehicle.id === id)
);

export const getVehiclesList = createSelector(
  getVehicleList,
  vehicleList => vehicleList
);
