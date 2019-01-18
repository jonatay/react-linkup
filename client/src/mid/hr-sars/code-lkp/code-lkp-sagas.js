import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { codeLkpActions } from './code-lkp-actions'
import { codeLkpList } from './code-lkp-list';
import { authActions } from 'src/mid/common/auth';

function* loadAllCodeLkps() {
  const codeLkps = yield call([
    codeLkpList,
    codeLkpList.list
  ]);
  yield put(
    codeLkpActions.loadCodeLkpsFulfilled(codeLkps)
  );
}
function* createCodeLkp({ payload: { codeLkp } }) {
  let result = yield call([codeLkpList, codeLkpList.insert], {
    codeLkp
  });
  yield put(
    codeLkpActions.createCodeLkpFulfilled(
      result.codeLkp
    )
  );
}

function* updateCodeLkp({ payload: { id, changes } }) {
  let result = yield call(
    [codeLkpList, codeLkpList.update],
    id,
    { changes }
  );
  yield put(
    codeLkpActions.updateCodeLkpFulfilled(
      result.codeLkp
    )
  );
}

function* removeCodeLkp({ payload: { codeLkp } }) {
  let result = yield call(
    [codeLkpList, codeLkpList.remove],
    codeLkp.id
  );
  if (result.status === 'deleted') {
    yield put(
      codeLkpActions.removeCodeLkpFulfilled(codeLkp)
    );
  } else {
    yield put(codeLkpActions.removeCodeLkpFailed(result));
  }
}
//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    codeLkpList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    codeLkpList.token = payload.null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    codeLkpList.token = payload.idToken;
  }
}

function* watchLoadCodeLkps() {
  yield takeEvery(
    codeLkpActions.LOAD_CODE_LKPS,
    loadAllCodeLkps
  );
}

function* watchCreateCodeLkp() {
  yield takeEvery(
    codeLkpActions.CREATE_CODE_LKP,
    createCodeLkp
  );
}

function* watchUpdateCodeLkp() {
  yield takeEvery(
    codeLkpActions.UPDATE_CODE_LKP,
    updateCodeLkp
  );
}

function* watchRemoveCodeLkp() {
  yield takeEvery(
    codeLkpActions.REMOVE_CODE_LKP,
    removeCodeLkp
  );
}

export const codeLkpSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadCodeLkps),
  fork(watchUpdateCodeLkp),
  fork(watchCreateCodeLkp),
  fork(watchRemoveCodeLkp)
];
