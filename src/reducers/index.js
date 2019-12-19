import { combineReducers } from 'redux';
import { LOGIN_SUCCESSFUL, LOGIN_FAILURE, ATTEMPT_LOGOUT } from 'constants/action-types';
import { firebaseReducer } from 'react-redux-firebase';


const initialAuthState = {
  loggedIn: false,
  userData: {},
}

function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_FAILURE:
      return {
        ...state,
        authError: 'Login Failed'
      }
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        loggedIn: true,
        authError: null,
      };
    case ATTEMPT_LOGOUT:
      return initialAuthState
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
})

export default rootReducer;
