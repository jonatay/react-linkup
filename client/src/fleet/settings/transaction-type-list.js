import { ApiList } from 'src/api/index';
import { settingActions } from './setting-actions';
import { TransactionType } from './transaction-type';

const transactionTypePath = 'fleet/transaction-types';

class TransactionTypeList extends ApiList {}

export const transactionTypeList = new TransactionTypeList(
  {
    // onAdd: settingActions.createCostCentreFulfilled(),
    // onChange: settingActions.updateCostCentreFulfilled(),
    onLoad: settingActions.loadTransactionTypesFulfilled()
    // onRemove: settingActions.removeCostCentreFulfilled()
  },
  TransactionType,
  transactionTypePath
);
