import { ApiList } from 'src/api/index';
import { sageBatchActions } from './sage-batch-actions';
import { SageBatch } from './sage-batch';

const sageBatchPath = 'sage-pay/sage-batches';

class SageBatchList extends ApiList {
  createSageBatch(data) {
    return this.customApiCall(null, 'create', data, 'post');
  }
  postBatch(id) {
    return this.customApiCall(id, 'post', {}, 'post');
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
