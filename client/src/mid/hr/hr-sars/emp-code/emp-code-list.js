import { ApiList } from 'src/mid/api/index';
import { empCodeActions } from './emp-code-actions';
import { EmpCode } from './emp-code';

const empCodePath = 'hr-sars/emp-codes';

class EmpCodeList extends ApiList {}

export const empCodeList = new EmpCodeList(
  {
    onAdd: empCodeActions.createEmpCodeFulfilled(),
    onChange: empCodeActions.updateEmpCodeFulfilled(),
    onLoad: empCodeActions.loadEmpCodesFulfilled(),
    onRemove: empCodeActions.removeEmpCodeFulfilled()
  },
  EmpCode,
  empCodePath
);
