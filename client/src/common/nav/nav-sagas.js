import { push } from 'react-router-redux';
import { navActions } from './nav-actions';
import { fork, put, take } from 'redux-saga/effects';

function* watchNavigation() {
  while (true) {
    const { payload } = yield take(navActions.NAVIGATE_TO);
    const module = payload.module;
    yield put(push(module));
  }
}

export const navSagas = [fork(watchNavigation)];
