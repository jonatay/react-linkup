import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { empCodesActions } from './emp-codes-actions'
import { empCodesList } from './emp-codes-list';
import { authActions } from 'src/mid/common/auth';

function* loadAllEmpCodess() {
  const empCodess = yield call([
    empCodesList,
    empCodesList.list
  ]);
  yield put(
    empCodesActions.loadEmpCodessFulfilled(empCodess)
  );
}
function* createEmpCodes({ payload: { empCodes } }) {
  let result = yield call([empCodesList, empCodesList.insert], {
    empCodes
  });
  yield put(
    empCodesActions.createEmpCodesFulfilled(
      result.empCodes
    )
  );
}

function* updateEmpCodes({ payload: { id, changes } }) {
  let result = yield call(
    [empCodesList, empCodesList.update],
    id,
    { changes }
  );
  yield put(
    empCodesActions.updateEmpCodesFulfilled(
      result.empCodes
    )
  );
}

function* removeEmpCodes({ payload: { empCodes } }) {
  let result = yield call(
    [empCodesList, empCodesList.remove],
    empCodes.id
  );
  if (result.status === 'deleted') {
    yield put(
      empCodesActions.removeEmpCodesFulfilled(empCodes)
    );
  } else {
    yield put(empCodesActions.removeEmpCodesFailed(result));
  }
}
//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    empCodesList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    empCodesList.token = payload.null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    empCodesList.token = payload.idToken;
  }
}

function* watchLoadEmpCodess() {
  yield takeEvery(
    empCodesActions.LOAD_EMP_CODESS,
    loadAllEmpCodess
  );
}

function* watchCreateEmpCodes() {
  yield takeEvery(
    empCodesActions.CREATE_EMP_CODES,
    createEmpCodes
  );
}

function* watchUpdateEmpCodes() {
  yield takeEvery(
    empCodesActions.UPDATE_EMP_CODES,
    updateEmpCodes
  );
}

function* watchRemoveEmpCodes() {
  yield takeEvery(
    empCodesActions.REMOVE_EMP_CODES,
    removeEmpCodes
  );
}

export const empCodesSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadEmpCodess),
  fork(watchUpdateEmpCodes),
  fork(watchCreateEmpCodes),
  fork(watchRemoveEmpCodes)
];
