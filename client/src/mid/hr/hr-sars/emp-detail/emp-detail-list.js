import { ApiList } from 'src/mid/api';
import { empDetailActions } from './emp-detail-actions';
import { EmpDetail } from './emp-detail';

const empDetailPath = 'hr-sars/emp-details';

class EmpDetailList extends ApiList {
  importEmpEasyfile = data => {
    return this.customApiCall(null, 'import-emp-easyfile', data, 'POST')
      .then(res => res)
      .catch(e => e);
  };
}

export const empDetailList = new EmpDetailList(
  {
    onAdd: empDetailActions.createEmpDetailFulfilled(),
    onChange: empDetailActions.updateEmpDetailFulfilled(),
    onLoad: empDetailActions.loadEmpDetailsFulfilled(),
    onRemove: empDetailActions.removeEmpDetailFulfilled()
  },
  EmpDetail,
  empDetailPath
);
