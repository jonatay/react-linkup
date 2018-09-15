import { ApiList } from 'src/mid/api/index';
import { fleetTransactionActions } from './fleet-transaction-actions';
import { FleetTransaction } from './fleet-transaction';

const fleetTransactionPath = 'fleet/fleet-transactions';

class FleetTransactionApiList extends ApiList {
  // addFleetTransactionRoles(uid, roles) {
  //   return this.customApiCall(uid, 'add-fleetTransaction-roles', roles, 'POST')
  //     .then(res => res)
  //     .catch(e => e);
  // }
  // removeFleetTransactionRoles(uid, roles) {
  //   return this.customApiCall(uid, 'remove-fleetTransaction-roles', roles, 'DELETE')
  //     .then(res => res)
  //     .catch(e => e);
  // }
}

export const fleetTransactionList = new FleetTransactionApiList(
  {
    onAdd: fleetTransactionActions.createFleetTransactionFulfilled,
    onChange: fleetTransactionActions.updateFleetTransactionFulfilled,
    onLoad: fleetTransactionActions.loadFleetTransactionsFulfilled,
    onRemove: fleetTransactionActions.toggleFleetTransactionIsActiveFulfilled
  },
  FleetTransaction,
  fleetTransactionPath
);
