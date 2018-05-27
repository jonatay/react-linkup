import { createSelector } from 'reselect';

export const getSageBatchesRoot = state => {
  return state.sagePay.sageBatches;
};

export const getSageBatchList = state => {
  return getSageBatchesRoot(state).list;
};

export const getFilter = state => {
  return getSageBatchesRoot(state).filter;
};

export const getSageBatchInstructions = () => [
  'Update',
  'PaySalaries',
  'DatedSalaries',
  'Realtime',
  'DatedPayments'
];

/*
Update – update the master file without loading a batch
PaySalaries – Sameday salary batch upload (ideal for bonus or once off payments where the time the recipient receives the funds is not important)
DatedSalaries – Dated salary batch upload (ideal for salary / wage payments)
Realtime – Sameday creditor batch upload (ideal for supplier or creditor payments)
DatedPayments – Dated creditor batch upload (ideal for once off payments where the time the recipient receives the funds is not important) Refer to service cutoff times below.

 */
/*
  Memorised
 */

export const getSageBatchById = createSelector(getSageBatchList, (list, id) =>
  list.filter(rec => rec.id === id)
);

export const getSageBatches = createSelector(getSageBatchList, sageBatchList =>
  sageBatchList.toArray()
);
