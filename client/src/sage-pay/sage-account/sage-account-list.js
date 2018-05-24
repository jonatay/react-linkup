import { ApiList } from 'src/api/index';
import { sageAccountActions } from './sage-account-actions';
import { SageAccount } from './sage-account';

const sageAccountPath = 'sage-pay/sage-accounts';

class SageAccountList extends ApiList {
  importBest(data) {
    return this.customApiCall(null, 'import-best', data, 'post');
  }
  importCubit() {
    return this.customApiCall(null, 'import-cubit', {}, 'post');
  }
}

export const sageAccountList = new SageAccountList(
  {
    // onAdd: sageAccountActions.createSageaccountFulfilled(),
    // onChange: sageAccountActions.updateSageaccountFulfilled(),
    onLoad: sageAccountActions.loadSageAccountsFulfilled()
    // onRemove: sageAccountActions.removeSageaccountFulfilled()
  },
  SageAccount,
  sageAccountPath
);
