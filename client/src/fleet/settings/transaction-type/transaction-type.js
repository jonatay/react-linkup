import { Record } from 'immutable';

export const TransactionType = new Record({
  id: null,
  name: null,
  fims_purchase_types: [],
  vat_rate: null,
  jdata: {}
});
