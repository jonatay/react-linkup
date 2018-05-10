import { ApiList } from 'src/api/index';
import { tranTypeCcActions } from './tran-type-cc-actions';
import { TransactionTypeCostCentre } from './transaction-type-cost-centre';

const transactionTypeCostCentrePath = 'fleet/transaction-type-cost-centres';

class TransactionTypeCostCentreList extends ApiList {}

export const transactionTypeCostCentreList = new TransactionTypeCostCentreList(
  {
    onAdd: tranTypeCcActions.createTransactionTypeCostCentreFulfilled(),
    onChange: tranTypeCcActions.updateTransactionTypeCostCentreFulfilled(),
    onLoad: tranTypeCcActions.loadTransactionTypeCostCentresFulfilled(),
    onRemove: tranTypeCcActions.removeTransactionTypeCostCentreFulfilled()
  },
  TransactionTypeCostCentre,
  transactionTypeCostCentrePath
);
