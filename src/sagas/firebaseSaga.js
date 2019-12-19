import { takeEvery, call, put } from 'redux-saga/effects';
import { ATTEMPT_LOGIN, LOGIN_SUCCESSFUL, LOGIN_FAILURE } from 'constants/action-types';
import firebase from 'firebase/app';

export default function* watcherSaga() {
  yield takeEvery(ATTEMPT_LOGIN,
    workerSaga);
}

function* workerSaga(params) {
  try {
    const response = yield call(firebaseAuth, params.payload);
    yield put({ type: LOGIN_SUCCESSFUL, response })
  } catch (e) {
    yield put({ type: LOGIN_FAILURE, payload: e })
  }
}

function firebaseAuth(payload) {
  return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
}
