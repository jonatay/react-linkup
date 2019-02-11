import { ApiList } from 'src/mid/api';
import { empMasterActions } from './emp-master-actions';
import { EmpMaster } from './emp-master';

const empMasterPath = 'hr-sars/emp-masters';

class EmpMasterList extends ApiList {
  importEmpMaster = data => {
    return this.customApiCall(null, 'import-emp-master', data, 'POST')
      .then(res => res)
      .catch(e => e);
  };
  listCubitCompanies = () => this.customApiGet('hr-sars/cubit-companies');
}

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
