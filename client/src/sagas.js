import { all } from 'redux-saga/effects';
import { commonSagas } from './common'; //rightSagas
import { adminSagas } from './admin';
import { fleetSagas } from './fleet';
import { sagePaySagas } from './sage-pay';

export default function* sagas() {
  yield all([...commonSagas, ...adminSagas, ...fleetSagas, ...sagePaySagas]);
}
