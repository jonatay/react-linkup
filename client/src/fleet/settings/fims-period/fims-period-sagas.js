import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { fimsPeriodActions, fimsPeriodList } from './';
import { authActions } from '../../../common/auth';

function* importFimsPeriod({ payload }) {
  //console.log(payload);
  const fimsPeriod = yield call(
    [fimsPeriodList, fimsPeriodList.importFimsPeriod],
    payload.id
  );
  yield put(fimsPeriodActions.importFimsPeriodFulfilled(fimsPeriod));
}

function* removeFimsPeriod({ payload }) {
  const id = yield call([fimsPeriodList, fimsPeriodList.remove], payload.id);
  yield put(fimsPeriodActions.removeFimsPeriodFulfilled(id));
}

function* loadFimsPeriods() {
  const fimsPeriods = yield call([fimsPeriodList, fimsPeriodList.list]);
  yield put(fimsPeriodActions.loadFimsPeriodsFulfilled(fimsPeriods));
}

function* postFimsBatch({ payload }) {
  const { fimsBatch } = payload;
  const postFimsBatchResult = yield call(
    [fimsPeriodList, fimsPeriodList.postFimsBatch],
    { fimsBatch }
  );
  yield put(fimsPeriodActions.postFimsBatchFulfilled(postFimsBatchResult));
}

//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    fimsPeriodList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    fimsPeriodList.token = null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    fimsPeriodList.token = payload.idToken;
  }
}

function* watchFimsLoadPeriods() {
  yield takeEvery(fimsPeriodActions.LOAD_FIRMS_PERIODS, loadFimsPeriods);
}

function* watchPostFimsBatch() {
  yield takeEvery(fimsPeriodActions.POST_FIMS_BATCH, postFimsBatch);
}

function* watchRemoveFimsPeriod() {
  yield takeEvery(fimsPeriodActions.REMOVE_FIRMS_PERIOD, removeFimsPeriod);
}

function* watchImportFimsPeriod() {
  yield takeEvery(fimsPeriodActions.IMPORT_FIRMS_PERIOD, importFimsPeriod);
}

export const fimsPeriodSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchFimsLoadPeriods),
  fork(watchPostFimsBatch),
  fork(watchRemoveFimsPeriod),
  fork(watchImportFimsPeriod)
];
