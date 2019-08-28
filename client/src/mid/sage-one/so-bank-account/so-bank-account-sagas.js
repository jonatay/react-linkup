import { call, fork, put, take, takeEvery } from "redux-saga/effects";
import { soBankAccountActions } from "./so-bank-account-actions";
import { soBankAccountList } from "./so-bank-account-list";
import { authActions } from "src/mid/common/auth";

function* loadAllSoBankAccounts() {
  const { soBankAccounts } = yield call([
    soBankAccountList,
    soBankAccountList.list
  ]);
  yield put(soBankAccountActions.loadSoBankAccountsFulfilled(soBankAccounts));
}
function* createSoBankAccount({ payload: { soBankAccount } }) {
  let result = yield call([soBankAccountList, soBankAccountList.insert], {
    soBankAccount
  });
  yield put(
    soBankAccountActions.createSoBankAccountFulfilled(result.soBankAccount)
  );
}

function* updateSoBankAccount({ payload: { id, changes } }) {
  let result = yield call([soBankAccountList, soBankAccountList.update], id, {
    changes
  });
  yield put(
    soBankAccountActions.updateSoBankAccountFulfilled(result.soBankAccount)
  );
}

function* removeSoBankAccount({ payload: { soBankAccount } }) {
  let result = yield call(
    [soBankAccountList, soBankAccountList.remove],
    soBankAccount.id
  );
  if (result.status === "deleted") {
    yield put(soBankAccountActions.removeSoBankAccountFulfilled(soBankAccount));
  } else {
    yield put(soBankAccountActions.removeSoBankAccountFailed(result));
  }
}
//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    soBankAccountList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    soBankAccountList.token = payload.null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    soBankAccountList.token = payload.idToken;
  }
}

function* watchLoadSoBankAccounts() {
  yield takeEvery(
    soBankAccountActions.LOAD_SO_BANK_ACCOUNTS,
    loadAllSoBankAccounts
  );
}

function* watchCreateSoBankAccount() {
  yield takeEvery(
    soBankAccountActions.CREATE_SO_BANK_ACCOUNT,
    createSoBankAccount
  );
}

function* watchUpdateSoBankAccount() {
  yield takeEvery(
    soBankAccountActions.UPDATE_SO_BANK_ACCOUNT,
    updateSoBankAccount
  );
}

function* watchRemoveSoBankAccount() {
  yield takeEvery(
    soBankAccountActions.REMOVE_SO_BANK_ACCOUNT,
    removeSoBankAccount
  );
}

export const soBankAccountSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadSoBankAccounts),
  fork(watchUpdateSoBankAccount),
  fork(watchCreateSoBankAccount),
  fork(watchRemoveSoBankAccount)
];
