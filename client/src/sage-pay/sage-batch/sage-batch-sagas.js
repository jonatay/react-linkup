import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { sageBatchActions, sageBatchList } from './';
import { authActions } from '../../common/auth';

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

function* postSageBatch({ payload: { id } }) {
  const { sageBatch } = yield call(
    [sageBatchList, sageBatchList.postBatch],
    id
  );
  yield put(sageBatchActions.postSageBatchFulfilled(sageBatch));
}

function* createSageBatch({ payload: { params } }) {
  const { sageBatch, validationResult } = yield call(
    [sageBatchList, sageBatchList.createSageBatch],
    { params }
  );
  yield put(
    sageBatchActions.createSageBatchFulfilled(sageBatch, validationResult)
  );
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

function* watchPostSageBatch() {
  yield takeEvery(sageBatchActions.POST_SAGE_BATCH, postSageBatch);
}

function* watchCreateSageBatch() {
  yield takeEvery(sageBatchActions.CREATE_SAGE_BATCH, createSageBatch);
}

export const sageBatchSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadSageBatches),
  fork(watchQuerySageBatch),
  fork(watchPostSageBatch),
  fork(watchCreateSageBatch)
];
