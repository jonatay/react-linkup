import { List, Record } from 'immutable';
import { payPointActions } from './pay-point-actions';

export const PayPointState = new Record({
  filter: '',
  list: new List()
});

export function payPointReducer(
  state = new PayPointState(),
  { payload, type }
) {
  switch (type) {
    case payPointActions.CREATE_PAY_POINT_FULFILLED:
      return state.set(
        'list',
        state.list.unshift(payload.payPoint)
      );

    case payPointActions.UPDATE_PAY_POINT_FULFILLED:
      return state.set(
        'list',
        state.list.map(r => {
          return r.id === payload.payPoint.id
            ? payload.payPoint
            : r;
        })
      );

    case payPointActions.REMOVE_PAY_POINT_FULFILLED:
      return state.set(
        'list',
        state.list.filter(payPoint => {
          return payPoint.id !== payload.payPoint.id;
        })
      );

    case payPointActions.LOAD_PAY_POINTS_FULFILLED:
      return state.set(
        'list',
        new List(payload.payPoints)
      );

    default:
      return state;
  }
}
