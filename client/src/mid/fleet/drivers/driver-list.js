import { ApiList } from 'src/mid/api/index';
import { driverActions } from './driver-actions';
import { Driver } from './driver';

const driverPath = 'fleet/drivers';

class DriverApiList extends ApiList {
  // addDriverRoles(uid, roles) {
  //   return this.customApiCall(uid, 'add-driver-roles', roles, 'POST')
  //     .then(res => res)
  //     .catch(e => e);
  // }
  // removeDriverRoles(uid, roles) {
  //   return this.customApiCall(uid, 'remove-driver-roles', roles, 'DELETE')
  //     .then(res => res)
  //     .catch(e => e);
  // }
}

export const driverList = new DriverApiList(
  {
    onAdd: driverActions.createDriverFulfilled,
    onChange: driverActions.updateDriverFulfilled,
    onLoad: driverActions.loadDriversFulfilled,
    onRemove: driverActions.removeDriverFulfilled
  },
  Driver,
  driverPath
);
