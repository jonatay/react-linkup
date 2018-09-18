import { ApiList } from 'src/mid/api/index';
import { transactionTypeActions } from './transaction-type-actions';
import { TransactionType } from './transaction-type';

const transactionTypePath = 'fleet/transaction-types';

class TransactionTypeList extends ApiList {}

export const transactionTypeList = new TransactionTypeList(
  {
    // onAdd: costCentreGroupActions.createCostCentreFulfilled(),
    // onDeptChange: costCentreGroupActions.updateCostCentreFulfilled(),
    onLoad: transactionTypeActions.loadTransactionTypesFulfilled()
    // onRemove: costCentreGroupActions.removeCostCentreFulfilled()
  },
  TransactionType,
  transactionTypePath
);
