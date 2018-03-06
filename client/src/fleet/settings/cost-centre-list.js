import { ApiList } from 'src/api/index';
import { settingActions } from './setting-actions';
import { CostCentre } from './cost-centre';

const costCentrePath = 'fleet/cost-centres';

class CostCentreList extends ApiList {
  // addDriverRoles(uid, roles) {
  //   return this.customApiCall(uid, 'add-costCentre-roles', roles, 'POST')
  //     .then(res => res)
  //     .catch(e => e);
  // }
  // removeDriverRoles(uid, roles) {
  //   return this.customApiCall(uid, 'remove-costCentre-roles', roles, 'DELETE')
  //     .then(res => res)
  //     .catch(e => e);
  // }
}

export const costCentreList = new CostCentreList(
  {
    onAdd: settingActions.createCostCentreFulfilled(),
    onChange: settingActions.updateCostCentreFulfilled(),
    onLoad: settingActions.loadCostCentresFulfilled(),
    onRemove: settingActions.removeCostCentreFulfilled()
  },
  CostCentre,
  costCentrePath
);
