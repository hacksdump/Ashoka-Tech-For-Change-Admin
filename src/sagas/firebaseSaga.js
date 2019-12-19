import { takeEvery, call, put, fork, all } from 'redux-saga/effects';
import {
  ATTEMPT_LOGIN,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILURE,
  FETCH_COMPLAINTS,
  COMPLAINTS_FETCHED,
  COMPLAINTS_FETCH_ERROR,
  SET_COMPLAINT_STATUS,
  COMPLAINT_STATUS_UPDATE_SUCCESS,
  COMPLAINT_STATUS_UPDATE_ERROR
} from 'constants/action-types';
import firebase from 'firebase/app';

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watcherSaga() {
  yield takeEvery(ATTEMPT_LOGIN,
    workerSaga);
}

function* fetchComplaintsWatcher() {
  yield takeEvery(FETCH_COMPLAINTS,
    fetchComplaintsWorker);
}

function* setComplaintStatusWatcher() {
  yield takeEvery(SET_COMPLAINT_STATUS,
    setComplaintStatusWorker);
}

export default function* root() {
  yield all([
    fork(watcherSaga),
    fork(fetchComplaintsWatcher),
    fork(setComplaintStatusWatcher),
  ])
}
/******************************************************************************/
/******************************* WORKERS *************************************/
/******************************************************************************/

function* workerSaga(params) {
  try {
    const response = yield call(firebaseAuth, params.payload);
    yield put({ type: LOGIN_SUCCESSFUL, response })
  } catch (e) {
    yield put({ type: LOGIN_FAILURE, payload: e })
  }
}

function* fetchComplaintsWorker() {
  try {
    const payload = yield call(firebaseFetchComplaints);
    yield put({ type: COMPLAINTS_FETCHED, payload })
  } catch (e) {
    yield put({ type: COMPLAINTS_FETCH_ERROR, payload: e })
  }
}

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

function firebaseAuth(payload) {
  return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
}

function firebaseFetchComplaints() {
  return new Promise((resolve, reject) => {
    const complaints = []
    firebase.database().ref('complaints').once('value').then((snapshot) => {
      snapshot.forEach(childSnapshot => {
        complaints.push(childSnapshot.val())
      })
      resolve(complaints);
    })
  })
}

function firebaseSetComplaintStatus(payload) {
  const updates = {};
  updates[`/complaints/${payload.compID}/status`] = payload.status;
  return firebase.database().ref().update(updates);
}
