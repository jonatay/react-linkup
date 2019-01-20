import { List, Record } from 'immutable';
import { codeLkpActions } from './code-lkp-actions';

export const CodeLkpState = new Record({
  filter: '',
  list: new List()
});

export function codeLkpReducer(
  state = new CodeLkpState(),
  { payload, type }
) {
  switch (type) {
    case codeLkpActions.CREATE_CODE_LKP_FULFILLED:
      return state.set(
        'list',
        state.list.unshift(payload.codeLkp)
      );

    case codeLkpActions.UPDATE_CODE_LKP_FULFILLED:
      return state.set(
        'list',
        state.list.map(r => {
          return r.id === payload.codeLkp.id
            ? payload.codeLkp
            : r;
        })
      );

    case codeLkpActions.REMOVE_CODE_LKP_FULFILLED:
      return state.set(
        'list',
        state.list.filter(codeLkp => {
          return codeLkp.id !== payload.codeLkp.id;
        })
      );

    case codeLkpActions.LOAD_CODE_LKPS_FULFILLED:
      return state.set(
        'list',
        new List(payload.codeLkps)
      );

    default:
      return state;
  }
}
