import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { spEmployeeActions } from './sp-employee-actions'
import { spEmployeeList } from './sp-employee-list';
import { authActions } from 'src/mid/common/auth';

function* loadAllSpEmployees() {
  const {spEmployees} = yield call([
    spEmployeeList,
    spEmployeeList.list
  ]);
  yield put(
    spEmployeeActions.loadSpEmployeesFulfilled(spEmployees)
  );
}
function* createSpEmployee({ payload: { spEmployee } }) {
  let result = yield call([spEmployeeList, spEmployeeList.insert], {
    spEmployee
  });
  yield put(
    spEmployeeActions.createSpEmployeeFulfilled(
      result.spEmployee
    )
  );
}

function* updateSpEmployee({ payload: { id, changes } }) {
  let result = yield call(
    [spEmployeeList, spEmployeeList.update],
    id,
    { changes }
  );
  yield put(
    spEmployeeActions.updateSpEmployeeFulfilled(
      result.spEmployee
    )
  );
}

function* removeSpEmployee({ payload: { spEmployee } }) {
  let result = yield call(
    [spEmployeeList, spEmployeeList.remove],
    spEmployee.id
  );
  if (result.status === 'deleted') {
    yield put(
      spEmployeeActions.removeSpEmployeeFulfilled(spEmployee)
    );
  } else {
    yield put(spEmployeeActions.removeSpEmployeeFailed(result));
  }
}
//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    spEmployeeList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    spEmployeeList.token = payload.null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    spEmployeeList.token = payload.idToken;
  }
}

function* watchLoadSpEmployees() {
  yield takeEvery(
    spEmployeeActions.LOAD_SP_EMPLOYEES,
    loadAllSpEmployees
  );
}

function* watchCreateSpEmployee() {
  yield takeEvery(
    spEmployeeActions.CREATE_SP_EMPLOYEE,
    createSpEmployee
  );
}

function* watchUpdateSpEmployee() {
  yield takeEvery(
    spEmployeeActions.UPDATE_SP_EMPLOYEE,
    updateSpEmployee
  );
}

function* watchRemoveSpEmployee() {
  yield takeEvery(
    spEmployeeActions.REMOVE_SP_EMPLOYEE,
    removeSpEmployee
  );
}

export const spEmployeeSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadSpEmployees),
  fork(watchUpdateSpEmployee),
  fork(watchCreateSpEmployee),
  fork(watchRemoveSpEmployee)
];
