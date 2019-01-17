import { ApiList } from 'src/mid/api/index';
import { empCodesActions } from './emp-codes-actions';
import { EmpCodes } from './emp-codes';

const empCodesPath = 'hr-sars/emp-codess';

class EmpCodesList extends ApiList {}

export const empCodesList = new EmpCodesList(
  {
    onAdd: empCodesActions.createEmpCodesFulfilled(),
    onChange: empCodesActions.updateEmpCodesFulfilled(),
    onLoad: empCodesActions.loadEmpCodessFulfilled(),
    onRemove: empCodesActions.removeEmpCodesFulfilled()
  },
  EmpCodes,
  empCodesPath
);
