import { ApiList } from 'src/mid/api/index';
import { sageAccountActions } from './sage-account-actions';
import { SageAccount } from './sage-account';
import { apiFetch, statusHelper } from '../../api/api-fetch';

const sageAccountPath = 'sage-pay/sage-accounts';

class SageAccountList extends ApiList {
  listEmp(params) {
    return apiFetch(this.path + '-emp', this.token, params)
      .then(statusHelper)
      .then(response => response.json())
      .catch(error => error);
  }

  importBest(data) {
    return this.customApiCall(null, 'import-best', data, 'post');
  }
  importCubit() {
    return this.customApiCall(null, 'import-cubit', {}, 'post');
  }
  validateSageAccount(id) {
    return this.customApiCall(id, 'validate-sage-account', {}, 'put');
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
