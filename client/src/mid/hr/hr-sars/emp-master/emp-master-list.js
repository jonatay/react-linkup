import { ApiList } from 'src/mid/api';
import { empMasterActions } from './emp-master-actions';
import { EmpMaster } from './emp-master';

const empMasterPath = 'hr-sars/emp-masters';

class EmpMasterList extends ApiList {}

export const empMasterList = new EmpMasterList(
  {
    onAdd: empMasterActions.createEmpMasterFulfilled(),
    onChange: empMasterActions.updateEmpMasterFulfilled(),
    onLoad: empMasterActions.loadEmpMastersFulfilled(),
    onRemove: empMasterActions.removeEmpMasterFulfilled()
  },
  EmpMaster,
  empMasterPath
);
