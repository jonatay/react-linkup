import { ApiList } from 'src/mid/api/index';
import { spEmployeeActions } from './sp-employee-actions';
import { SpEmployee } from './sp-employee';

const spEmployeePath = 'simple-pay/sp-employees';

class SpEmployeeList extends ApiList {}

export const spEmployeeList = new SpEmployeeList(
  {
    onAdd: spEmployeeActions.createSpEmployeeFulfilled(),
    onChange: spEmployeeActions.updateSpEmployeeFulfilled(),
    onLoad: spEmployeeActions.loadSpEmployeesFulfilled(),
    onRemove: spEmployeeActions.removeSpEmployeeFulfilled()
  },
  SpEmployee,
  spEmployeePath
);
