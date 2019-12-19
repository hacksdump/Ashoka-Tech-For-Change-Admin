import { combineReducers } from 'redux';
import {
  LOGIN_SUCCESSFUL,
  LOGIN_FAILURE,
  ATTEMPT_LOGOUT,
  COMPLAINTS_FETCHED,
  CLEAR_COMPLAINTS,
  COMPLAINT_STATUS_UPDATE_SUCCESS
} from 'constants/action-types';
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
      return state.concat(action.payload);
    case CLEAR_COMPLAINTS:
      return initialComplaints;
    case COMPLAINT_STATUS_UPDATE_SUCCESS:
      const newState = Object.assign([], state);
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].compID === action.payload.compID) {
          newState[i].status = action.payload.newStatus;
        }
      }
      return newState;
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
