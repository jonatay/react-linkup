import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { empMasterActions } from './emp-master-actions';
import { empMasterList } from './emp-master-list';
import { authActions } from 'src/mid/common/auth';

function* loadAllEmpMasters() {
  const { empMasters } = yield call([empMasterList, empMasterList.list]);
  yield put(empMasterActions.loadEmpMastersFulfilled(empMasters));
}

function* createEmpMaster({ payload: { empMaster } }) {
  let result = yield call([empMasterList, empMasterList.insert], {
    empMaster
  });
  yield put(empMasterActions.createEmpMasterFulfilled(result.empMaster));
}

function* updateEmpMaster({ payload: { id, changes } }) {
  let result = yield call([empMasterList, empMasterList.update], id, {
    changes
  });
  yield put(empMasterActions.updateEmpMasterFulfilled(result.empMaster));
}

function* removeEmpMaster({ payload: { empMaster } }) {
  let result = yield call([empMasterList, empMasterList.remove], empMaster.id);
  if (result.status === 'deleted') {
    yield put(empMasterActions.removeEmpMasterFulfilled(empMaster));
  } else {
    yield put(empMasterActions.removeEmpMasterFailed(result));
  }
}
//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    empMasterList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    empMasterList.token = payload.null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    empMasterList.token = payload.idToken;
  }
}

function* watchLoadEmpMasters() {
  yield takeEvery(empMasterActions.LOAD_EMP_MASTERS, loadAllEmpMasters);
}

function* watchCreateEmpMaster() {
  yield takeEvery(empMasterActions.CREATE_EMP_MASTER, createEmpMaster);
}

function* watchUpdateEmpMaster() {
  yield takeEvery(empMasterActions.UPDATE_EMP_MASTER, updateEmpMaster);
}

function* watchRemoveEmpMaster() {
  yield takeEvery(empMasterActions.REMOVE_EMP_MASTER, removeEmpMaster);
}

export const empMasterSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadEmpMasters),
  fork(watchUpdateEmpMaster),
  fork(watchCreateEmpMaster),
  fork(watchRemoveEmpMaster)
];
