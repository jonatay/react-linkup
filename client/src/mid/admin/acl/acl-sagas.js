import {
  call,
  take,
  takeEvery,
  put,
  fork,
  cancel,
  race
} from 'redux-saga/effects';

import { aclActions } from './acl-actions';
import { aclApi } from './acl-api';
import { authActions } from '../../common/index';
const aclPath = 'admin';

// function subscribeToAcl() {
//   return eventChannel(emit => aclData.subscribe(emit));
// }

// function* readFromAcl() {
//   const channel = yield call(subscribeToAcl);
//   while (true) {
//     let action = yield take(channel);
//     yield put(action);
//   }
// }

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

function* addUserRoles({ payload }) {
  let result = yield call([aclApi, aclApi.aclAddUserRoles], payload);
  yield put(aclActions.aclAddUserRolesOk(result));
}

function* removeUserRoles({ payload }) {
  let result = yield call([aclApi, aclApi.aclRemoveUserRoles], payload);
  yield put(aclActions.aclRemoveUserRolesOk(result));
}

function* removeRole({ payload }) {
  console.log(payload);
  let result = yield call([aclApi, aclApi.aclRemoveRole], payload);
  yield put(aclActions.aclRemoveRoleOk(result));
}

function* removeRoles({ payload }) {
  // console.log(payload);
  for (let role of payload.roles) {
    const task = yield put(aclActions.aclRemoveRole(role));
    const { error } = yield race({
      success: take(aclActions.ACL_REMOVE_ROLE_OK),
      error: take(aclActions.ACL_REMOVE_ROLE_FAIL)
    });
    if (error) {
      yield cancel(task);
      break;
    }
  }
}

function* removeResource({ payload }) {
  console.log(payload);
  let result = yield call([aclApi, aclApi.aclRemoveResource], payload);
  yield put(aclActions.aclRemoveResourceOk(result));
}

function* removeResources({ payload }) {
  for (let resource of payload.resources) {
    const task = yield put(aclActions.aclRemoveResource(resource));
    const { error } = yield race({
      success: take(aclActions.ACL_REMOVE_RESOURCE_OK),
      error: take(aclActions.ACL_REMOVE_RESOURCE_FAIL)
    });
    if (error) {
      yield cancel(task);
      break;
    }
  }
}
//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    aclApi.token = payload.idToken;
    aclApi.path = aclPath;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    aclApi.token = null;
    aclApi.path = null;
  }
}

// function* watchAclLoadData() {
//   yield;
// }

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

function* watchAddUserRoles() {
  yield takeEvery(aclActions.ACL_ADD_USER_ROLES, addUserRoles);
}

function* watchRemoveUserRoles() {
  yield takeEvery(aclActions.ACL_REMOVE_USER_ROLES, removeUserRoles);
}

function* watchRemoveRole() {
  yield takeEvery(aclActions.ACL_REMOVE_ROLE, removeRole);
}

function* watchRemoveRoles() {
  yield takeEvery(aclActions.ACL_REMOVE_ROLES, removeRoles);
}

function* watchRemoveResource() {
  yield takeEvery(aclActions.ACL_REMOVE_RESOURCE, removeResource);
}

function* watchRemoveResources() {
  yield takeEvery(aclActions.ACL_REMOVE_RESOURCES, removeResources);
}

//=====================================
//  ACL SAGAS
//-------------------------------------
export const aclSagas = [
  fork(watchAuthentication),
  fork(watchAclAllow),
  fork(watchAclDeny),
  fork(watchAclAddRoleParents),
  fork(watchAclRemoveRoleParents),
  fork(watchAddUserRoles),
  fork(watchRemoveUserRoles),
  fork(watchRemoveRoles),
  fork(watchRemoveRole),
  fork(watchRemoveResources),
  fork(watchRemoveResource)
];
