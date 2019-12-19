import { combineReducers } from 'redux';
import { LOGIN_SUCCESSFUL, LOGIN_FAILURE, ATTEMPT_LOGOUT, COMPLAINTS_FETCHED, CLEAR_COMPLAINTS } from 'constants/action-types';
import { firebaseReducer } from 'react-redux-firebase';


const initialAuthState = {
  loggedIn: false,
  userData: {},
}

const initialComplaints = []

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

function complaintReducer(state = initialComplaints, action) {
  switch (action.type) {
    case COMPLAINTS_FETCHED:
      console.log(action)
      return state.concat(action.payload);
    case CLEAR_COMPLAINTS:
      return initialComplaints;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  complaints: complaintReducer,
  firebase: firebaseReducer,
})

export default rootReducer;
