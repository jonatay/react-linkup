import { Record } from 'immutable';

export const Vehicle = new Record({
  id: null,
  name: null,
  registration: null,
  make: null,
  model: {},
  year: null,
  fims_registrations: null,
  fims_names: null,
  fims_drivers: [],
  jdata: {},
  is_active: null
});
