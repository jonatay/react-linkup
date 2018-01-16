import { LOCATION_CHANGE } from 'react-router-redux';
import { eventChannel } from 'redux-saga';
import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { authActions } from 'src/auth';
import { roleActions } from './role-actions';
import { roleList } from './role-list';
import { navActions } from 'src/admin';

function subscribe() {
  return eventChannel(emit => roleList.subscribe(emit));
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

const createRole = write.bind(
  null,
  roleList,
  roleList.push,
  roleActions.createRoleFailed
);
const removeRole = write.bind(
  null,
  roleList,
  roleList.remove,
  roleActions.removeRoleFailed
);
const updateRole = write.bind(
  null,
  roleList,
  roleList.update,
  roleActions.updateRoleFailed
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

function* watchCreateRole() {
  while (true) {
    let { payload } = yield take(roleActions.CREATE_ROLE);
    yield fork(createRole, payload.role);
  }
}

function* watchLocationChange() {
  while (true) {
    let { payload } = yield take(LOCATION_CHANGE);
    if (payload.pathname === navActions.modules.navToAdminRights.url) {
      roleList.path = `acl/roles`;
      const job = yield fork(read);

      yield take([authActions.SIGN_OUT_FULFILLED]);
      yield cancel(job);
      // const params = new URLSearchParams(payload.search);
      // const filter = params.get('filter');
      // yield put(roleActions.filterRoles(filter));
    }
  }
}

function* watchRemoveRole() {
  while (true) {
    let { payload } = yield take(roleActions.REMOVE_ROLE);
    yield fork(removeRole, payload.role.key);
  }
}

function* watchUpdateRole() {
  while (true) {
    let { payload } = yield take(roleActions.UPDATE_ROLE);
    yield fork(updateRole, payload.role.key, payload.changes);
  }
}

//=====================================
//  ROLE SAGAS
//-------------------------------------
export const roleSagas = [
  // fork(watchAuthentication),
  fork(watchCreateRole),
  fork(watchLocationChange),
  fork(watchRemoveRole),
  fork(watchUpdateRole)
];
