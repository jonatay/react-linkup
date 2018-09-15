import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { sageBatchActions, sageBatchList } from './index';
import { authActions } from '../../common/auth/index';

function* loadSageBatches() {
  const { sageBatches } = yield call([sageBatchList, sageBatchList.list]);
  yield put(sageBatchActions.loadSageBatchesFulfilled(sageBatches));
}

function* querySageBatch({ payload: { id } }) {
  const { sageBatch } = yield call(
    [sageBatchList, sageBatchList.querySageBatch],
    id
  );
  yield put(sageBatchActions.querySageBatchFulfilled(sageBatch));
}

function* submitSageBatch({ payload: { id } }) {
  const { sageBatch } = yield call(
    [sageBatchList, sageBatchList.submitBatch],
    id
  );
  console.log(sageBatch);
  yield put(sageBatchActions.sumbitSageBatchFulfilled(sageBatch));
}

function* createSageBatch({ payload: { params } }) {
  const { sageBatch } = yield call(
    [sageBatchList, sageBatchList.createSageBatch],
    { params }
  );
  yield put(sageBatchActions.createSageBatchFulfilled(sageBatch));
}

function* deleteSageBatch({ payload: { id: delId } }) {
  const { id } = yield call([sageBatchList, sageBatchList.remove], delId);
  yield put(sageBatchActions.deleteSageBatchFulfilled(parseInt(id, 10)));
}
//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    sageBatchList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    sageBatchList.token = null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    sageBatchList.token = payload.idToken;
  }
}

function* watchLoadSageBatches() {
  yield takeEvery(sageBatchActions.LOAD_SAGE_BATCHES, loadSageBatches);
}

function* watchQuerySageBatch() {
  yield takeEvery(sageBatchActions.QUERY_SAGE_BATCH, querySageBatch);
}

function* watchSubmitSageBatch() {
  yield takeEvery(sageBatchActions.SUBMIT_SAGE_BATCH, submitSageBatch);
}

function* watchCreateSageBatch() {
  yield takeEvery(sageBatchActions.CREATE_SAGE_BATCH, createSageBatch);
}

function* watchDeleteSageBatch() {
  yield takeEvery(sageBatchActions.DELETE_SAGE_BATCH, deleteSageBatch);
}

export const sageBatchSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadSageBatches),
  fork(watchQuerySageBatch),
  fork(watchSubmitSageBatch),
  fork(watchCreateSageBatch),
  fork(watchDeleteSageBatch)
];
