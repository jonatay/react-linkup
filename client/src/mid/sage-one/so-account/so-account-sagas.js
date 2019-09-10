import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { soAccountActions } from './so-account-actions'
import { soAccountList } from './so-account-list';
import { authActions } from 'src/mid/common/auth';

function* loadAllSoAccounts() {
  const soAccounts = yield call([
    soAccountList,
    soAccountList.list
  ]);
  yield put(
    soAccountActions.loadSoAccountsFulfilled(soAccounts)
  );
}
function* createSoAccount({ payload: { soAccount } }) {
  let result = yield call([soAccountList, soAccountList.insert], {
    soAccount
  });
  yield put(
    soAccountActions.createSoAccountFulfilled(
      result.soAccount
    )
  );
}

function* updateSoAccount({ payload: { id, changes } }) {
  let result = yield call(
    [soAccountList, soAccountList.update],
    id,
    { changes }
  );
  yield put(
    soAccountActions.updateSoAccountFulfilled(
      result.soAccount
    )
  );
}

function* removeSoAccount({ payload: { soAccount } }) {
  let result = yield call(
    [soAccountList, soAccountList.remove],
    soAccount.id
  );
  if (result.status === 'deleted') {
    yield put(
      soAccountActions.removeSoAccountFulfilled(soAccount)
    );
  } else {
    yield put(soAccountActions.removeSoAccountFailed(result));
  }
}
//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    soAccountList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    soAccountList.token = payload.null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    soAccountList.token = payload.idToken;
  }
}

function* watchLoadSoAccounts() {
  yield takeEvery(
    soAccountActions.LOAD_SO_ACCOUNTS,
    loadAllSoAccounts
  );
}

function* watchCreateSoAccount() {
  yield takeEvery(
    soAccountActions.CREATE_SO_ACCOUNT,
    createSoAccount
  );
}

function* watchUpdateSoAccount() {
  yield takeEvery(
    soAccountActions.UPDATE_SO_ACCOUNT,
    updateSoAccount
  );
}

function* watchRemoveSoAccount() {
  yield takeEvery(
    soAccountActions.REMOVE_SO_ACCOUNT,
    removeSoAccount
  );
}

export const soAccountSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadSoAccounts),
  fork(watchUpdateSoAccount),
  fork(watchCreateSoAccount),
  fork(watchRemoveSoAccount)
];
