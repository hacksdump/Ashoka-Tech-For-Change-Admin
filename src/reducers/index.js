import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase/app';
import { ATTEMPT_LOGOUT } from 'constants/action-types';

function authReducer(state, action) {
  switch (action.type) {
    case ATTEMPT_LOGOUT:
      firebase.logout();
      return {};
    default:
      return {};
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
})

export default rootReducer;
