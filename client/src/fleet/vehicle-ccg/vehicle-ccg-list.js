import { ApiList } from 'src/api/index';
import { vehicleCcgActions } from './vehicle-ccg-actions';
import { VehicleCcg } from './vehicle-ccg';

const vehicleCcgPath = 'fleet/vehicle-ccgs';

class VehicleCcgApiList extends ApiList {

}

export const vehicleCcgList = new VehicleCcgApiList(
  {
    onAdd: vehicleCcgActions.createVehicleCcgFulfilled,
    onChange: vehicleCcgActions.updateVehicleCcgFulfilled,
    onLoad: vehicleCcgActions.loadVehicleCcgsFulfilled,
    onRemove: vehicleCcgActions.toggleVehicleCcgIsActiveFulfilled
  },
  VehicleCcg,
  vehicleCcgPath
);
