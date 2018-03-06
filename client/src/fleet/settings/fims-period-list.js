import { ApiList } from 'src/api/index';
import { settingActions } from './setting-actions';
import { FimsPeriod } from './fims-period';

const fimsPeriodPath = 'fleet/fims-periods';

class FimsPeriodList extends ApiList {
  postFimsBatch = data => {
    return this.customApiCall(null, 'post-fims-batch', data, 'POST')
      .then(res => res)
      .catch(e => e);
  };
}

export const fimsPeriodList = new FimsPeriodList(
  {
    // onAdd: settingActions.createCostCentreFulfilled(),
    // onChange: settingActions.updateCostCentreFulfilled(),
    onLoad: settingActions.loadFimsPeriodsFulfilled()
    // onRemove: settingActions.removeCostCentreFulfilled()
  },
  FimsPeriod,
  fimsPeriodPath
);
