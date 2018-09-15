import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { costCentreGroupList, costCentreGroupActions } from './index';
import { authActions } from '../../../common/auth/index';

function* loadAllCostCentreGroups() {
  const costCentreGroups = yield call([
    costCentreGroupList,
    costCentreGroupList.list
  ]);
  yield put(
    costCentreGroupActions.loadCostCentreGroupsFulfilled(costCentreGroups)
  );
}
function* createCostCentreGroup({ payload: { costCentreGroup } }) {
  let result = yield call([costCentreGroupList, costCentreGroupList.insert], {
    costCentreGroup
  });
  yield put(
    costCentreGroupActions.createCostCentreGroupFulfilled(
      result.costCentreGroup
    )
  );
}

function* updateCostCentreGroup({ payload: { id, changes } }) {
  let result = yield call(
    [costCentreGroupList, costCentreGroupList.update],
    id,
    { changes }
  );
  yield put(
    costCentreGroupActions.updateCostCentreGroupFulfilled(
      result.costCentreGroup
    )
  );
}

function* removeCostCentreGroup({ payload: { costCentreGroup } }) {
  let result = yield call(
    [costCentreGroupList, costCentreGroupList.remove],
    costCentreGroup.id
  );
  if (result.status === 'deleted') {
    yield put(
      costCentreGroupActions.removeCostCentreGroupFulfilled(costCentreGroup)
    );
  } else {
    yield put(costCentreGroupActions.removeCostCentreGroupFailed(result));
  }
}
//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    costCentreGroupList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    costCentreGroupList.token = payload.null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    costCentreGroupList.token = payload.idToken;
  }
}

function* watchLoadCostCentreGroups() {
  yield takeEvery(
    costCentreGroupActions.LOAD_COST_CENTRE_GROUPS,
    loadAllCostCentreGroups
  );
}

function* watchCreateCostCentreGroup() {
  yield takeEvery(
    costCentreGroupActions.CREATE_COST_CENTRE_GROUP,
    createCostCentreGroup
  );
}

function* watchUpdateCostCentreGroup() {
  yield takeEvery(
    costCentreGroupActions.UPDATE_COST_CENTRE_GROUP,
    updateCostCentreGroup
  );
}

function* watchRemoveCostCentreGroup() {
  yield takeEvery(
    costCentreGroupActions.REMOVE_COST_CENTRE_GROUP,
    removeCostCentreGroup
  );
}

export const costCentreGroupSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadCostCentreGroups),
  fork(watchUpdateCostCentreGroup),
  fork(watchCreateCostCentreGroup),
  fork(watchRemoveCostCentreGroup)
];
