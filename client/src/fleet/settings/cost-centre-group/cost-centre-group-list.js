import { ApiList } from 'src/api/index';
import { costCentreGroupActions } from './cost-centre-group-actions';
import { CostCentreGroup } from './cost-centre-group';

const costCentreGroupPath = 'fleet/cost-centre-groups';

class CostCentreGroupList extends ApiList {}

export const costCentreGroupList = new CostCentreGroupList(
  {
    onAdd: costCentreGroupActions.createCostCentreGroupFulfilled(),
    onChange: costCentreGroupActions.updateCostCentreGroupFulfilled(),
    onLoad: costCentreGroupActions.loadCostCentreGroupsFulfilled(),
    onRemove: costCentreGroupActions.removeCostCentreGroupFulfilled()
  },
  CostCentreGroup,
  costCentreGroupPath
);
