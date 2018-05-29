import { ApiList } from 'src/api/index';
import { sageBatchActions } from './sage-batch-actions';
import { SageBatch } from './sage-batch';

const sageBatchPath = 'sage-pay/sage-batches';

class SageBatchList extends ApiList {
  createSageBatch(data) {
    return this.customApiCall(null, 'create', data, 'post');
  }
  submitBatch(id) {
    return this.customApiCall(id, 'submit', {}, 'post');
  }
  querySageBatch(id) {
    return this.customApiCall(id, '', {}, 'get');
  }
}

export const sageBatchList = new SageBatchList(
  {
    onLoad: sageBatchActions.loadSageBatchesFulfilled()
  },
  SageBatch,
  sageBatchPath
);
