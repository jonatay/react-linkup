import { ApiList } from 'src/mid/api';
import { empDetailActions } from './emp-detail-actions';
import { EmpDetail } from './emp-detail';

const empDetailPath = 'hr-sars/emp-details';

class EmpDetailList extends ApiList {}

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
