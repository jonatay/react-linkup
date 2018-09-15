import {
  call,
  fork,
  put,
  take,
  takeEvery,
  race,
  cancel
} from 'redux-saga/effects';
import { fimsPeriodActions, fimsPeriodList } from './index';
import { authActions } from '../../../common/auth/index';

function* removeFimsPeriod({ payload }) {
  const id = yield call([fimsPeriodList, fimsPeriodList.remove], payload.id);
  yield put(fimsPeriodActions.removeFimsPeriodFulfilled(id));
}

function* loadFimsPeriods() {
  const { status, fimsPeriods, error } = yield call([
    fimsPeriodList,
    fimsPeriodList.list
  ]);
  if (status === 'ok') {
    yield put(fimsPeriodActions.loadFimsPeriodsFulfilled(fimsPeriods));
  } else {
    yield put(fimsPeriodActions.loadFimsPeriodsFailed(error));
  }
}

function* postFimsBatch({ payload }) {
  const { fimsBatch } = payload;
  const postFimsBatchResult = yield call(
    [fimsPeriodList, fimsPeriodList.postFimsBatch],
    { fimsBatch }
  );
  yield put(fimsPeriodActions.postFimsBatchFulfilled(postFimsBatchResult));
}

function* importFimsPeriod({ payload: { id } }) {
  //console.log(payload);
  const { status, fimsPeriod, error } = yield call(
    [fimsPeriodList, fimsPeriodList.importFimsPeriod],
    id
  );
  if (status === 'ok') {
    yield put(fimsPeriodActions.importFimsPeriodFulfilled(fimsPeriod));
  } else {
    yield put(fimsPeriodActions.importFimsPeriodFailed(error));
  }
}

function* importFimsPeriodBatch({ payload: { fimsPeriods } }) {
  for (let fp of fimsPeriods) {
    const task = yield put(fimsPeriodActions.importFimsPeriod(fp.id));
    const { error } = yield race({
      success: take(fimsPeriodActions.IMPORT_FIRMS_PERIOD_FULFILLED),
      error: take(fimsPeriodActions.IMPORT_FIRMS_PERIOD_FAILED)
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

function* watchImportFimsPeriodBatch() {
  yield takeEvery(
    fimsPeriodActions.IMPORT_FIMS_PERIOD_BATCH,
    importFimsPeriodBatch
  );
}

export const fimsPeriodSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchFimsLoadPeriods),
  fork(watchPostFimsBatch),
  fork(watchRemoveFimsPeriod),
  fork(watchImportFimsPeriod),
  fork(watchImportFimsPeriodBatch)
];
