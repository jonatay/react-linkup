import { createSelector } from 'reselect';
import { getVehicleCcgList } from '../vehicle-ccg/index';

export function getVehiclesFromState(state) {
  return state.fleet.vehicles;
}

export function getVehicleFilter(state) {
  return getVehiclesFromState(state).filter;
}

export function getVehcleShowInactive(state) {
  return getVehiclesFromState(state).showInactive;
}

export function getVehicleList(state) {
  return getVehiclesFromState(state).list;
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleVehicles = createSelector(
  getVehicleList,
  getVehicleFilter,
  getVehcleShowInactive,
  getVehicleCcgList,
  (vehicleList, filter, showInactive, vehicleCcgs) =>
    vehicleList
      .filter(
        vehicle =>
          ((!showInactive && vehicle.is_active) ||
            (showInactive && !vehicle.is_active)) &&
          (vehicle.name.toLowerCase().includes(filter.toLowerCase()) ||
            vehicle.registration.toLowerCase().includes(filter.toLowerCase()))
      )
      .toArray()
      .map(v => ({
        ...v,
        vehicleCcgs: vehicleCcgs
          .filter(vccg => vccg.vehicle_id === v.id)
          .toArray()
      }))
);

export const getVehicleById = createSelector(
  getVehicleList,
  (vehicleList, id) => vehicleList.filter(vehicle => vehicle.id === id)
);

export const getVehiclesList = createSelector(
  getVehicleList,
  vehicleList => vehicleList
);

export const getVehicles = createSelector(getVehiclesList, vehicleList =>
  vehicleList.toArray()
);
