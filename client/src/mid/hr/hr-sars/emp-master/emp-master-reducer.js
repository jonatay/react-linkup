import { List, Record } from 'immutable';
import { empMasterActions } from './emp-master-actions';

export const EmpMasterState = new Record({
  filter: '',
  list: new List()
});

export function empMasterReducer(
  state = new EmpMasterState(),
  { payload, type }
) {
  switch (type) {
    case empMasterActions.CREATE_EMP_MASTER_FULFILLED:
      return state.set(
        'list',
        state.list.unshift(payload.empMaster)
      );

    case empMasterActions.UPDATE_EMP_MASTER_FULFILLED:
      return state.set(
        'list',
        state.list.map(r => {
          return r.id === payload.empMaster.id
            ? payload.empMaster
            : r;
        })
      );

    case empMasterActions.REMOVE_EMP_MASTER_FULFILLED:
      return state.set(
        'list',
        state.list.filter(empMaster => {
          return empMaster.id !== payload.empMaster.id;
        })
      );

    case empMasterActions.LOAD_EMP_MASTERS_FULFILLED:
      return state.set(
        'list',
        new List(payload.empMasters)
      );

    default:
      return state;
  }
}
