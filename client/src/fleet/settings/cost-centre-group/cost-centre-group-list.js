import { ApiList } from 'src/api/index';
import { settingActions } from '../setting-actions';
import { CostCentreGroup } from './cost-centre-group';

const costCentreGroupPath = 'fleet/cost-centre-groups';

class CostCentreGroupList extends ApiList {}

export const costCentreGroupList = new CostCentreGroupList(
  {
    // onAdd: costCentreGroupActions.createCostCentreFulfilled(),
    // onChange: costCentreGroupActions.updateCostCentreFulfilled(),
    onLoad: settingActions.loadCostCentreGroupsFulfilled()
    // onRemove: costCentreGroupActions.removeCostCentreFulfilled()
  },
  CostCentreGroup,
  costCentreGroupPath
);
