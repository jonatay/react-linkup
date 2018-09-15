import { ApiList } from 'src/mid/api/index';
import { tranTypeCcActions } from './tran-type-cc-actions';
import { TranTypeCc } from './tran-type-cc';

const tranTypeCcPath = 'fleet/transaction-type-cost-centres';

class TranTypeCcList extends ApiList {}

export const tranTypeCcList = new TranTypeCcList(
  {
    onAdd: tranTypeCcActions.createTranTypeCcFulfilled(),
    onChange: tranTypeCcActions.updateTranTypeCcFulfilled(),
    onLoad: tranTypeCcActions.loadTranTypeCcsFulfilled(),
    onRemove: tranTypeCcActions.removeTranTypeCcFulfilled()
  },
  TranTypeCc,
  tranTypeCcPath
);
