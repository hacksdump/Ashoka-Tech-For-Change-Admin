import { ATTEMPT_LOGIN, LOGIN_SUCCESSFUL } from "constants/action-types";

export function attemptLogIn(payload) {
  return {
    type: ATTEMPT_LOGIN,
    payload,
  }
}

export function logInSuccessful(payload) {
  return {
    type: LOGIN_SUCCESSFUL,
    payload,
  }
}
