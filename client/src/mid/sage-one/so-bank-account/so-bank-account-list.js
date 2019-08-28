import { ApiList } from 'src/mid/api/index';
import { soBankAccountActions } from './so-bank-account-actions';
import { SoBankAccount } from './so-bank-account';

const soBankAccountPath = 'sage-one/so-bank-accounts';

class SoBankAccountList extends ApiList {}

export const soBankAccountList = new SoBankAccountList(
  {
    onAdd: soBankAccountActions.createSoBankAccountFulfilled(),
    onChange: soBankAccountActions.updateSoBankAccountFulfilled(),
    onLoad: soBankAccountActions.loadSoBankAccountsFulfilled(),
    onRemove: soBankAccountActions.removeSoBankAccountFulfilled()
  },
  SoBankAccount,
  soBankAccountPath
);
