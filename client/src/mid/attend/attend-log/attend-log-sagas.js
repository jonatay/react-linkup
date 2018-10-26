import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { attendLogActions } from './attend-log-actions';
import { attendLogList } from './attend-log-list';
import { authActions } from 'src/mid/common/auth';

function* loadAllAttendLogs({ payload }) {
  const attendLogs = yield call(
    [attendLogList, attendLogList.list],
    payload.listParams
  );
  yield put(attendLogActions.loadAttendLogsFulfilled(attendLogs));
}
function* createAttendLog({ payload: { attendLog } }) {
  let result = yield call([attendLogList, attendLogList.insert], {
    attendLog
  });
  yield put(attendLogActions.createAttendLogFulfilled(result.attendLog));
}

function* updateAttendLog({ payload: { id, changes } }) {
  let result = yield call([attendLogList, attendLogList.update], id, {
    changes
  });
  yield put(attendLogActions.updateAttendLogFulfilled(result.attendLog));
}

function* removeAttendLog({ payload: { attendLog } }) {
  let result = yield call([attendLogList, attendLogList.remove], attendLog.id);
  if (result.status === 'deleted') {
    yield put(attendLogActions.removeAttendLogFulfilled(attendLog));
  } else {
    yield put(attendLogActions.removeAttendLogFailed(result));
  }
}

function* loadAttendLogPdf({ payload: { listParams } }) {
  let result = yield call(
    [attendLogList, attendLogList.getPdf],
    {listParams},
    'list-pdf'
  );
  yield put(attendLogActions.loadAttendLogPdfFulfilled(result))
}
//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    attendLogList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    attendLogList.token = payload.null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    attendLogList.token = payload.idToken;
  }
}

function* watchLoadAttendLogs() {
  yield takeEvery(attendLogActions.LOAD_ATTEND_LOGS, loadAllAttendLogs);
}

function* watchCreateAttendLog() {
  yield takeEvery(attendLogActions.CREATE_ATTEND_LOG, createAttendLog);
}

function* watchUpdateAttendLog() {
  yield takeEvery(attendLogActions.UPDATE_ATTEND_LOG, updateAttendLog);
}

function* watchRemoveAttendLog() {
  yield takeEvery(attendLogActions.REMOVE_ATTEND_LOG, removeAttendLog);
}

function* watchLoadAttendLogPdf() {
  yield takeEvery(attendLogActions.LOAD_ATTEND_LOG_PDF, loadAttendLogPdf);
}

export const attendLogSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadAttendLogs),
  fork(watchUpdateAttendLog),
  fork(watchCreateAttendLog),
  fork(watchRemoveAttendLog),
  fork(watchLoadAttendLogPdf)
];
