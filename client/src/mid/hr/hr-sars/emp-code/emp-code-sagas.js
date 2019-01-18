import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { empCodeActions } from './emp-code-actions'
import { empCodeList } from './emp-code-list';
import { authActions } from 'src/mid/common/auth';

function* loadAllEmpCodes() {
  const {empCodes} = yield call([
    empCodeList,
    empCodeList.list
  ]);
  yield put(
    empCodeActions.loadEmpCodesFulfilled(empCodes)
  );
}
function* createEmpCode({ payload: { empCode } }) {
  let result = yield call([empCodeList, empCodeList.insert], {
    empCode
  });
  yield put(
    empCodeActions.createEmpCodeFulfilled(
      result.empCode
    )
  );
}

function* updateEmpCode({ payload: { id, changes } }) {
  let result = yield call(
    [empCodeList, empCodeList.update],
    id,
    { changes }
  );
  yield put(
    empCodeActions.updateEmpCodeFulfilled(
      result.empCode
    )
  );
}

function* removeEmpCode({ payload: { empCode } }) {
  let result = yield call(
    [empCodeList, empCodeList.remove],
    empCode.id
  );
  if (result.status === 'deleted') {
    yield put(
      empCodeActions.removeEmpCodeFulfilled(empCode)
    );
  } else {
    yield put(empCodeActions.removeEmpCodeFailed(result));
  }
}
//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    empCodeList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    empCodeList.token = payload.null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    empCodeList.token = payload.idToken;
  }
}

function* watchLoadEmpCodes() {
  yield takeEvery(
    empCodeActions.LOAD_EMP_CODES,
    loadAllEmpCodes
  );
}

function* watchCreateEmpCode() {
  yield takeEvery(
    empCodeActions.CREATE_EMP_CODE,
    createEmpCode
  );
}

function* watchUpdateEmpCode() {
  yield takeEvery(
    empCodeActions.UPDATE_EMP_CODE,
    updateEmpCode
  );
}

function* watchRemoveEmpCode() {
  yield takeEvery(
    empCodeActions.REMOVE_EMP_CODE,
    removeEmpCode
  );
}

export const empCodeSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadEmpCodes),
  fork(watchUpdateEmpCode),
  fork(watchCreateEmpCode),
  fork(watchRemoveEmpCode)
];
