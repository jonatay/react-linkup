import { createSelector } from 'reselect';
import { getCostCentreGroups } from '../settings/index';

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
  (vehicleCcgList, id) =>
    vehicleCcgList.filter(vehicleCcg => vehicleCcg.id === id)
);

export const getVehicleCcgList = createSelector(
  getVehicleCcgsList,
  getCostCentreGroups,
  (vehicleCcgList, costCentreGroups) =>
    vehicleCcgList.map(vccg => ({
      ...vccg,
      cost_centre_group: costCentreGroups.find(
        ccg => ccg.id === vccg.cost_centre_group_id
      )
    }))
);

