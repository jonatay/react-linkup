import { ApiList } from 'src/mid/api/index';
import { payPointActions } from './pay-point-actions';
import { PayPoint } from './pay-point';

const payPointPath = 'simple-pay/pay-points';

class PayPointList extends ApiList {}

export const payPointList = new PayPointList(
  {
    onAdd: payPointActions.createPayPointFulfilled(),
    onChange: payPointActions.updatePayPointFulfilled(),
    onLoad: payPointActions.loadPayPointsFulfilled(),
    onRemove: payPointActions.removePayPointFulfilled()
  },
  PayPoint,
  payPointPath
);
