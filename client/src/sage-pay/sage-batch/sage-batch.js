import { Record } from 'immutable';

export const SageBatch = new Record({
  id: null,
  batch_name: null,
  instruction: null,
  action_date: null,
  keys: null,
  tran_count: null,
  tran_sum: null,
  status_log: null,
  tax_year: null,
  tax_month: null,
  batch_transactions: null,
  file_token: null
});
