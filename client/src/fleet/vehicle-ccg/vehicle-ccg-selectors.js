import { createSelector } from 'reselect';

export function getVehicleCcgs(state) {
  return state.vehicleCcgs;
}

export function getVehicleCcgFilter(state) {
  return getVehicleCcgs(state).filter;
}

export function getVehicleCcgsList(state) {
  return getVehicleCcgs(state.fleet).list;
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleVehicleCcgs = createSelector(
  getVehicleCcgsList,
  vehicleCcgList => vehicleCcgList
);

export const getVehicleCcgById = createSelector(
  getVehicleCcgsList,
  (vehicleCcgList, uid) =>
    vehicleCcgList.filter(vehicleCcg => vehicleCcg.uid === uid)
);

export const getVehicleCcgList = createSelector(
  getVehicleCcgsList,
  vehicleCcgList => vehicleCcgList
);
