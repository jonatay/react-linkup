import { ApiList } from 'src/mid/api/index';
import { vehicleActions } from './vehicle-actions';
import { Vehicle } from './vehicle';

const vehiclePath = 'fleet/vehicles';

class VehicleApiList extends ApiList {
  // addVehicleRoles(uid, roles) {
  //   return this.customApiCall(uid, 'add-vehicle-roles', roles, 'POST')
  //     .then(res => res)
  //     .catch(e => e);
  // }
  // removeVehicleRoles(uid, roles) {
  //   return this.customApiCall(uid, 'remove-vehicle-roles', roles, 'DELETE')
  //     .then(res => res)
  //     .catch(e => e);
  // }
}

export const vehicleList = new VehicleApiList(
  {
    onAdd: vehicleActions.createVehicleFulfilled,
    onChange: vehicleActions.updateVehicleFulfilled,
    onLoad: vehicleActions.loadVehiclesFulfilled,
    onRemove: vehicleActions.toggleVehicleIsActiveFulfilled
  },
  Vehicle,
  vehiclePath
);
