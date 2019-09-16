import { push } from "connected-react-router";
import { fork, put, take} from 'redux-saga/effects';
import Cookies from 'js-cookie';

import { navActions } from './nav-actions';
import { authActions } from '../index';

function* watchNavigation() {
  while (true) {
    const { payload } = yield take(navActions.NAVIGATE_TO);
    const module = payload.module;
    //console.log(module);
    Cookies.set('last-nav', module, { expires: 7 });
    yield put(push(module));
  }
}

function* watchAuthentication() {
  while (true) {
    yield take(authActions.SIGN_IN_FULFILLED);
    const module = Cookies.get('last-nav');
    if (module) {
      yield put(push(module));
    }
  }
}

export const navSagas = [fork(watchNavigation), fork(watchAuthentication)];
