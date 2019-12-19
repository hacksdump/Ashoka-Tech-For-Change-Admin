import { takeEvery, call, put, fork, all } from 'redux-saga/effects';
import {
  SET_COMPLAINT_STATUS,
  COMPLAINT_STATUS_UPDATE_SUCCESS,
  COMPLAINT_STATUS_UPDATE_ERROR
} from 'constants/action-types';
import firebase from 'firebase/app';

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/


function* setComplaintStatusWatcher() {
  yield takeEvery(SET_COMPLAINT_STATUS,
    setComplaintStatusWorker);
}

export default function* root() {
  yield all([
    fork(setComplaintStatusWatcher),
  ])
}
/******************************************************************************/
/******************************* WORKERS *************************************/
/******************************************************************************/

function* setComplaintStatusWorker(action) {
  try {
    yield call(firebaseSetComplaintStatus, action.payload);
    yield put({ type: COMPLAINT_STATUS_UPDATE_SUCCESS, payload: { compID: action.payload.compID, newStatus: action.payload.status } })
  } catch (e) {
    yield put({ type: COMPLAINT_STATUS_UPDATE_ERROR, payload: e })
  }
}
/******************************************************************************/
/******************************* API CALLS *************************************/
/******************************************************************************/

function firebaseSetComplaintStatus(payload) {
  const updates = {};
  updates[`/complaints/${payload.compID}/status`] = payload.status;
  return firebase.database().ref().update(updates);
}
