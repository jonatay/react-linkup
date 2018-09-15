import { Record } from 'immutable';

export const FleetTransaction = new Record({
  tax_year: null,
  tax_month: null,
  transaction_date: null,
  process_date: null,
  registration: null,
  cost_centre_id: null,
  vehicle_id: null,
  driver_id: null,
  fims_voucher_id: null,
  merchant_id: null,
  amount: null,
  jdata: null,
  transaction_type_id: null,
  description: null,
  vat_amount: null,
  invoice_number: null,
  odometer: null
});
