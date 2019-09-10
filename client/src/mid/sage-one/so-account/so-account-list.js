import { ApiList } from 'src/mid/api/index';
import { soAccountActions } from './so-account-actions';
import { SoAccount } from './so-account';

const soAccountPath = 'sage-one/so-accounts';

class SoAccountList extends ApiList {}

export const soAccountList = new SoAccountList(
  {
    onAdd: soAccountActions.createSoAccountFulfilled(),
    onChange: soAccountActions.updateSoAccountFulfilled(),
    onLoad: soAccountActions.loadSoAccountsFulfilled(),
    onRemove: soAccountActions.removeSoAccountFulfilled()
  },
  SoAccount,
  soAccountPath
);
