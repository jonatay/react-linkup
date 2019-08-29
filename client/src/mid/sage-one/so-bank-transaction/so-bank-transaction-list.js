import { ApiList } from 'src/mid/api/index';
import { soBankTransactionActions } from './so-bank-transaction-actions';
import { SoBankTransaction } from './so-bank-transaction';

const soBankTransactionPath = 'sage-one/so-bank-transactions';

class SoBankTransactionList extends ApiList {}

export const soBankTransactionList = new SoBankTransactionList(
  {
    onAdd: soBankTransactionActions.createSoBankTransactionFulfilled(),
    onChange: soBankTransactionActions.updateSoBankTransactionFulfilled(),
    onLoad: soBankTransactionActions.loadSoBankTransactionsFulfilled(),
    onRemove: soBankTransactionActions.removeSoBankTransactionFulfilled()
  },
  SoBankTransaction,
  soBankTransactionPath
);
