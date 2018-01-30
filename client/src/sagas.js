import { all } from 'redux-saga/effects';
import { commonSagas } from './common'; //rightSagas
import { adminSagas } from './admin';

export default function* sagas() {
  yield all([...commonSagas, ...adminSagas]);
}
