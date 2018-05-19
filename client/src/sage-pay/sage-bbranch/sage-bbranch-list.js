import { ApiList } from 'src/api/index';
import { sageBBranchActions } from './sage-bbranch-actions';
import { SageBBranch } from './sage-bbranch';

const sageBBranchPath = 'sage-pay/sage-bbranches';

class SageBBranchList extends ApiList {
  import() {
    return this.customApiCall(null, 'import', {}, 'post');
  }
}

export const sageBBranchList = new SageBBranchList(
  {
    // onAdd: sageBBranchActions.createSagebBranchFulfilled(),
    // onChange: sageBBranchActions.updateSagebBranchFulfilled(),
    onLoad: sageBBranchActions.loadSageBBranchesFulfilled()
    // onRemove: sageBBranchActions.removeSagebBranchFulfilled()
  },
  SageBBranch,
  sageBBranchPath
);
