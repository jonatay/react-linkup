import { Record } from 'immutable';

export const FimsPeriod = new Record({
  id: null,
  cal_year: null,
  cal_month: null,
  when_received: null,
  rows_received: null,
  must_refresh: null,
  account: null,
  batch_total: null,
  jdata: {},
  rows_transactions: null,
  transactions_total: null,
  when_imported: null,
  check_total: 0
});
