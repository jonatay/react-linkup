import { call, take, takeEvery, put, fork, cancel } from 'redux-saga/effects';

import { aclActions } from './acl-actions';
import { aclApi } from './acl-api';
import { authActions } from '../auth';
import { aclData } from './acl-data';
import { eventChannel } from 'redux-saga';

const aclPath = 'admin/acl';

function subscribeToAcl() {
  return eventChannel(emit => aclData.subscribe(emit));
}

function* readFromAcl() {
  const channel = yield call(subscribeToAcl);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* aclAllow({ payload }) {
  let result = yield call([aclApi, aclApi.aclAllow], payload);
  yield put(aclActions.aclAllowOk(result));
}

function* aclDeny({ payload }) {
  let result = yield call([aclApi, aclApi.aclDeny], payload);
  yield put(aclActions.aclDenyOk(result));
}

function* aclAddRoleParents({ payload }) {
  let result = yield call([aclApi, aclApi.aclAddRoleParents], payload);
  yield put(aclActions.aclAddRoleParentsOk(result));
}

function* aclRemoveRoleParents({ payload }) {
  let result = yield call([aclApi, aclApi.aclRemoveRoleParents], payload);
  yield put(aclActions.aclRemoveRoleParentsOk(result));
}

//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    let token = yield call([payload.authUser, payload.authUser.getIdToken]);
    aclApi.token = token;
    aclApi.path = aclPath;
    const job = yield fork(readFromAcl);
    yield take([authActions.SIGN_OUT_FULFILLED]);
    aclApi.token = null;
    aclApi.path = null;
    yield cancel(job);
  }
}

function* watchAclAllow() {
  yield takeEvery(aclActions.ACL_ALLOW, aclAllow);
}

function* watchAclDeny() {
  yield takeEvery(aclActions.ACL_DENY, aclDeny);
}

function* watchAclAddRoleParents() {
  yield takeEvery(aclActions.ACL_ADD_ROLE_PARENTS, aclAddRoleParents);
}

function* watchAclRemoveRoleParents() {
  yield takeEvery(aclActions.ACL_REMOVE_ROLE_PARENTS, aclRemoveRoleParents);
}

//=====================================
//  ACL SAGAS
//-------------------------------------
export const aclSagas = [
  fork(watchAuthentication),
  fork(watchAclAllow),
  fork(watchAclDeny),
  fork(watchAclAddRoleParents),
  fork(watchAclRemoveRoleParents)
];
