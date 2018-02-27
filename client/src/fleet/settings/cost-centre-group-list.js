import { ApiList } from 'src/api/index';
import { settingActions } from './setting-actions';
import { CostCentreGroup } from './cost-centre-group';

const costCentreGroupPath = 'fleet/cost-centre-groups';

class DriverApiList extends ApiList {}

export const costCentreGroupList = new DriverApiList(
  {
    // onAdd: settingActions.createCostCentreFulfilled(),
    // onChange: settingActions.updateCostCentreFulfilled(),
    onLoad: settingActions.loadCostCentreGroupsFulfilled()
    // onRemove: settingActions.removeCostCentreFulfilled()
  },
  CostCentreGroup,
  costCentreGroupPath
);
