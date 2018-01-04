import { all } from 'redux-saga/effects';
import { authSagas } from './auth';
import { userSagas, navSagas } from './admin';

export default function* sagas() {
  yield all([...authSagas, ...navSagas, ...userSagas]);
}
