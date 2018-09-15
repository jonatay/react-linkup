import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { tranTypeCcList, tranTypeCcActions } from './index';
import { authActions } from '../../../common/auth/index';

function* loadAllTranTypeCcs() {
  const tranTypeCcs = yield call([
    tranTypeCcList,
    tranTypeCcList.list
  ]);
  yield put(
    tranTypeCcActions.loadTranTypeCcsFulfilled(
      tranTypeCcs
    )
  );
}

function* createTranTypeCc({
  payload: { tranTypeCc }
}) {
  let result = yield call(
    [tranTypeCcList, tranTypeCcList.insert],
    {
      transactionTypeCostCentre : tranTypeCc
    }
  );
  yield put(
    tranTypeCcActions.createTranTypeCcFulfilled(
      result.transactionTypeCostCentre
    )
  );
}

function* updateTranTypeCc({ payload: { id, changes } }) {
  let result = yield call(
    [tranTypeCcList, tranTypeCcList.update],
    id,
    { changes }
  );
  yield put(
    tranTypeCcActions.updateTranTypeCcFulfilled(
      result.tranTypeCc
    )
  );
}

function* removeTranTypeCc({
  payload: { tranTypeCc }
}) {
  let result = yield call(
    [tranTypeCcList, tranTypeCcList.remove],
    tranTypeCc.id
  );
  if (result.status === 'deleted') {
    yield put(
      tranTypeCcActions.removeTranTypeCcFulfilled(
        tranTypeCc
      )
    );
  } else {
    yield put(tranTypeCcActions.removeTranTypeCcFailed(result));
  }
}

function* updateTranTypeCcBatch({ payload: { tranTypeCcs, changes } }) {
  console.log(tranTypeCcs, changes);
  // look for changes without id - add
  const addTtCcs = changes.filter(r => !r.id);
  // look for matching v.id = c.id where different - modify
  const modTtCcs = changes.filter(ttcc => {
    const vCcg = tranTypeCcs.find(r => r.id === ttcc.id);
    return !vCcg ? false : JSON.stringify(vCcg) !== JSON.stringify(ttcc);
  });
  // look for v.id missing in c - delete
  const delTtCcs = tranTypeCcs.filter(r => !changes.find(c => c.id === r.id));
  console.log({ add: addTtCcs, mod: modTtCcs, del: delTtCcs });
  for (let ccg of addTtCcs) {
    yield put(tranTypeCcActions.createTranTypeCc(ccg));
  }
  for (let ccg of modTtCcs) {
    yield put(tranTypeCcActions.updateTranTypeCc(ccg));
  }
  for (let ccg of delTtCcs) {
    yield put(tranTypeCcActions.removeTranTypeCc(ccg));
  }
}
//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    tranTypeCcList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    tranTypeCcList.token = payload.null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    tranTypeCcList.token = payload.idToken;
  }
}

function* watchLoadTranTypeCcs() {
  yield takeEvery(
    tranTypeCcActions.LOAD_TRANSACTION_TYPE_COST_CENTRES,
    loadAllTranTypeCcs
  );
}

function* watchCreateTranTypeCc() {
  yield takeEvery(
    tranTypeCcActions.CREATE_TRANSACTION_TYPE_COST_CENTRE,
    createTranTypeCc
  );
}

function* watchUpdateTranTypeCc() {
  yield takeEvery(
    tranTypeCcActions.UPDATE_TRANSACTION_TYPE_COST_CENTRE,
    updateTranTypeCc
  );
}

function* watchRemoveTranTypeCc() {
  yield takeEvery(
    tranTypeCcActions.REMOVE_TRANSACTION_TYPE_COST_CENTRE,
    removeTranTypeCc
  );
}

function* watchUpdateTranCcBatch() {
  yield takeEvery(
    tranTypeCcActions.UPDATE_TRANSACTION_TYPE_COST_CENTRE_BATCH,
    updateTranTypeCcBatch
  );
}

export const tranTypeCcSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadTranTypeCcs),
  fork(watchUpdateTranTypeCc),
  fork(watchCreateTranTypeCc),
  fork(watchRemoveTranTypeCc),
  fork(watchUpdateTranCcBatch)
];
