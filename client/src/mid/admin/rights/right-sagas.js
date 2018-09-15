import { LOCATION_CHANGE } from 'react-router-redux';
import { eventChannel } from 'redux-saga';
import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { authActions } from '../../common/auth/index';
import { rightActions } from './right-actions';
import { rightList } from './right-list';
import { navActions } from 'src/mid/admin/users/index';

function subscribe() {
  return eventChannel(emit => rightList.subscribe(emit));
}

function* read() {
  const channel = yield call(subscribe);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(context, method, onError, ...params) {
  try {
    yield call([context, method], ...params);
  } catch (error) {
    yield put(onError(error));
  }
}

const createRight = write.bind(
  null,
  rightList,
  rightList.push,
  rightActions.createRightFailed
);
const removeRight = write.bind(
  null,
  rightList,
  rightList.remove,
  rightActions.removeRightFailed
);
const updateRight = write.bind(
  null,
  rightList,
  rightList.update,
  rightActions.updateRightFailed
);

//=====================================
//  WATCHERS
//-------------------------------------
// function* watchAuthentication() {
//   while (true) {
//     let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
//
//
//   }
// }

function* watchCreateRight() {
  while (true) {
    let { payload } = yield take(rightActions.CREATE_RIGHT);
    yield fork(createRight, payload.right);
  }
}

// function* watchLocationChange() {
//   while (true) {
//     let { payload } = yield take(LOCATION_CHANGE);
//     if (payload.pathname === navActions.modules.navToAdminRights.url) {
//       rightList.path = `rights`;
//       const job = yield fork(read);
//
//       yield take([authActions.SIGN_OUT_FULFILLED]);
//       yield cancel(job);
//       // const listParams = new URLSearchParams(payload.search);
//       // const filter = listParams.get('filter');
//       // yield put(rightActions.filterRights(filter));
//     }
//   }
// }

function* watchRemoveRight() {
  while (true) {
    let { payload } = yield take(rightActions.REMOVE_RIGHT);
    yield fork(removeRight, payload.right.key);
  }
}

function* watchUpdateRight() {
  while (true) {
    let { payload } = yield take(rightActions.UPDATE_RIGHT);
    yield fork(updateRight, payload.right.key, payload.changes);
  }
}

//=====================================
//  RIGHT SAGAS
//-------------------------------------
export const rightSagas = [
  // fork(watchAuthentication),
  fork(watchCreateRight),
  // fork(watchLocationChange),
  fork(watchRemoveRight),
  fork(watchUpdateRight)
];
