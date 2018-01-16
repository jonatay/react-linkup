import { all } from 'redux-saga/effects';
import { authSagas } from './auth';
import { userSagas, navSagas } from './admin';//rightSagas
import { roleSagas } from "./acl/roles";

export default function* sagas() {
  yield all([...authSagas, ...navSagas, ...userSagas, ...roleSagas]); //...rightSagas,
}
