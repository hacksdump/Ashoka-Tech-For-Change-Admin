import { combineReducers } from 'redux';
import { LOGIN_SUCCESSFUL } from 'constants/action-types';


const initialAuthState = {
  loggedIn: false,
  userData: {},
}

function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        loggedIn: true
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
})

export default rootReducer;
