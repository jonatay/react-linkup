import { ApiList } from 'src/api/index';
import { fimsPeriodActions } from './fims-period-actions';
import { FimsPeriod } from './fims-period';

const fimsPeriodPath = 'fleet/fims-periods';

class FimsPeriodList extends ApiList {
  postFimsBatch = data => {
    return this.customApiCall(null, 'post-fims-batch', data, 'POST')
      .then(res => res)
      .catch(e => e);
  };
  importFimsPeriod = id => {
    return this.customApiCall(id, 'import-fims-period', {}, 'PUT')
      .then(res => res)
      .catch(e => e);
  };
}

export const fimsPeriodList = new FimsPeriodList(
  {
    // onAdd: fimsPeriodActions.createFimsPeriodFulfilled(),
    // onChange: fimsPeriodActions.updateFimsPeriodFulfilled(),
    onLoad: fimsPeriodActions.loadFimsPeriodsFulfilled(),
    // onRemove: fimsPeriodActions.removeFimsPeriodFulfilled()
  },
  FimsPeriod,
  fimsPeriodPath
);
