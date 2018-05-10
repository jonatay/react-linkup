import { ApiList } from 'src/api/index';
import { transactionTypeActions } from './transaction-type-actions';
import { TransactionType } from './transaction-type';

const transactionTypePath = 'fleet/transaction-types';

class TransactionTypeList extends ApiList {}

export const transactionTypeList = new TransactionTypeList(
  {
    // onAdd: costCentreGroupActions.createCostCentreFulfilled(),
    // onChange: costCentreGroupActions.updateCostCentreFulfilled(),
    onLoad: transactionTypeActions.loadTransactionTypesFulfilled()
    // onRemove: costCentreGroupActions.removeCostCentreFulfilled()
  },
  TransactionType,
  transactionTypePath
);
