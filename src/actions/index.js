import { ATTEMPT_LOGIN, ATTEMPT_LOGOUT } from "constants/action-types";

export function attemptLogin(payload) {
  return { type: ATTEMPT_LOGIN, payload }
}

export function attemptLogout() {
  return { type: ATTEMPT_LOGOUT }
}
