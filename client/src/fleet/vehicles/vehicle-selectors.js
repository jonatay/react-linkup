import { createSelector } from 'reselect';

export function getVehicles(state) {
  return state.fleet.vehicles;
}

export function getVehicleFilter(state) {
  return getVehicles(state).filter;
}

export function getVehcleShowInactive(state) {
  return getVehicles(state).showInactive;
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
  getVehcleShowInactive,
  (vehicleList, filter, showInactive) =>
    vehicleList.filter(
      vehicle =>
        ((!showInactive && vehicle.is_active) ||
          (showInactive && !vehicle.is_active)) &&
        (vehicle.name.toLowerCase().includes(filter.toLowerCase()) ||
          vehicle.registration.toLowerCase().includes(filter.toLowerCase()) ||
          vehicle.fims_drivers
            .join(' ')
            .toLowerCase()
            .includes(filter.toLowerCase()))
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
